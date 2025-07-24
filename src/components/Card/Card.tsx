import { Card as CardUi, Image, Button } from "@mantine/core";
import { useReducer } from "react";
import type { CardItem } from "../../service/spacex-api";
import NoPosterImage from "../../assets/image/no-poster-image.png";
import Modal from "../Modal";
import "./Card.css";

interface CardProps {
  data: CardItem;
}

interface PatchProps {
  patch: string | null;
}

const initialState = { modal: false };

function reducer(state: { modal: boolean }, action: { type: string }) {
  switch (action.type) {
    case "open-modal":
      return { modal: true };
    case "close-modal":
      return { modal: false };
    default:
      return state;
  }
}

const GetPoster = ({ patch }: PatchProps) => {
  if (!patch)
    return (
      <div className="image__no-poster">
        <Image style={{ transform: "scale(0.75)" }} src={NoPosterImage} />
      </div>
    );

  return <Image style={{ transform: "scale(0.6)" }} src={patch} />;
};

const Card = ({ data }: CardProps) => {
  console.log(data)
  const { mission_patch_small, mission_name, rocket_name } = data;
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      {state.modal && (
        <Modal
          {...data}
          onClick={() => {
            dispatch({ type: "close-modal" });
          }}
        />
      )}
      <CardUi h={410} w={300} shadow="sm" padding="md" radius="md" withBorder>
        <div className="card">
          <div className="card__image image">
            <GetPoster patch={mission_patch_small ?? null} />
          </div>
          <div className="card__text text">
            <h3 className="text__title">{mission_name}</h3>
            <span className="text__description">{rocket_name}</span>
          </div>
          <div className="card__button">
            <Button
              onClick={() => dispatch({ type: "open-modal" })}
              w="100%"
              size="lg"
              radius="md"
              variant="filled"
            >
              See more
            </Button>
          </div>
        </div>
      </CardUi>
    </>
  );
};

export default Card;
