import { createPortal } from "react-dom";
import { Image } from "@mantine/core";
import IconClose from "../../assets/image/icon-close.svg";
import NoPosterImage from "../../assets/image/no-poster-image.png";
import type { CardItem } from "../../service/spacex-api";
import "./Modal.css";

interface ModalProps extends CardItem {
  onClick: () => void;
}

const Modal = (props: ModalProps) => {
  const { mission_patch, mission_name, rocket_name, details, onClick } = props;
  const modalElement = document.getElementById("modal");
  if (!modalElement) return null;

  return createPortal(
    <>
      <section className="modal" data-testid="modal">
        <div className="modal__header">
          <h3>{mission_name}</h3>
          <div className="modal__button-close">
            <Image
              onClick={() => {
                onClick();
              }}
              data-testid="close-button"
              src={IconClose}
            />
          </div>
        </div>
        <div className="modal__image">
          <Image
            style={{ transform: "scale(0.3)" }}
            src={mission_patch ?? NoPosterImage}
          />
        </div>
        <div className="modal__description description">
          <div className="description__text">
            <h4>Mission name:</h4>
            <span>{mission_name}</span>
          </div>
          <div className="description__text">
            <h4>Rocket name:</h4>
            <span>{rocket_name}</span>
          </div>
          <div className="description__text">
            <h4>Details:</h4>
            <span>{details ?? "No information about launch"}</span>
          </div>
        </div>
      </section>
      <div
        onClick={() => {
          onClick();
        }}
        className="background__modal"
        data-testid="background__modal"
      ></div>
    </>,
    modalElement
  );
};

export default Modal;
