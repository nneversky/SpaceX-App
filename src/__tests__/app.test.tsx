import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import App from "../pages/app";

vi.mock("../service/spacex-api", () => ({
  default: vi.fn().mockImplementation(() => ({
    getJsonList: () =>
      Promise.resolve([
        {
          links: {
            mission_patch_small:
              "https://images2.imgbox.com/9a/96/nLppz9HW_o.png",
            mission_patch: "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
          },
          mission_name: "Starlink 2",
          rocket: {
            rocket_name: "Falcon 9",
          },
          details: "This mission will launch the second batch of Starlink...",
        },
      ]),
  })),
}));

describe("App component", () => {
  beforeEach(async () => {
    const existingModal = document.getElementById("modal");
    if (existingModal) {
      existingModal.remove();
    }

    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    document.body.appendChild(modalRoot);

    await act(async () => {
      render(<App />);
    });
  });

  describe("default rander App", () => {
    it("text title", async () => {
      expect(
        await screen.findByText("SpaceX Launches 2020")
      ).toBeInTheDocument();
    });

    it("mission name", async () => {
      expect(await screen.findByText("Starlink 2")).toBeInTheDocument();
    });

    it("rocket name", async () => {
      expect(await screen.findByText("Falcon 9")).toBeInTheDocument();
    });

    it("rander button", async () => {
      expect(
        await screen.findByRole("button", { name: /see more/i })
      ).toBeInTheDocument();
    });
  });

  describe("Modal component", () => {
    it("click button 'See more' ", async () => {
      const buttonShowModal = await screen.findByText("See more");
      fireEvent.click(buttonShowModal);

      await waitFor(() => {
        const modal = screen.queryByTestId("modal");
        expect(modal).toBeInTheDocument();
      });
    });

    it("click on close button Modal", async () => {
      const buttonShowModal = await screen.findByText("See more");
      fireEvent.click(buttonShowModal);

      const closeButton = await screen.findByTestId("close-button");
      expect(closeButton).toBeInTheDocument();
      fireEvent.click(closeButton);

      await waitFor(() => {
        const modal = screen.queryByTestId("modal");
        expect(modal).not.toBeInTheDocument();
      });
    });

    it("click on bg Modal and close component", async () => {
      const buttonShowModal = await screen.findByText("See more");
      fireEvent.click(buttonShowModal);

      const closeButton = await screen.findByTestId("close-button");
      expect(closeButton).toBeInTheDocument();

      const bgModal = await screen.findByTestId("background__modal");
      fireEvent.click(bgModal);

      await waitFor(() => {
        const modal = screen.queryByTestId("modal");
        expect(modal).not.toBeInTheDocument();
      });
    });
  });
});
