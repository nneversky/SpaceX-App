import { useEffect, useReducer } from "react";
import { Table, Title } from "@mantine/core";
import SpaceXApi from "../../service/spacex-api";
import Card from "../../components/Card";
import type { CardItem, LaunchApi } from "../../service/spacex-api";
import "./CardList.css";

interface CardItemInterfece {
  data: CardItem[];
}

const initialState = { data: [] };

function reducer(
  state: CardItemInterfece,
  action: { type: string; payload: CardItem[] }
) {
  switch (action.type) {
    case "UPDATE_DATA":
      return {
        data: action.payload,
      };
    default:
      return state;
  }
}

const CardList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const apiLaunch = new SpaceXApi();
    apiLaunch.getJsonList().then((data : LaunchApi[]) => {
      const newData : CardItem[] = data.map((item) => {
        return {
          mission_patch_small: item.links?.mission_patch_small,
          mission_patch: item.links?.mission_patch,
          mission_name: item.mission_name,
          rocket_name: item.rocket?.rocket_name,
          details: item.details,
        };
      });

      dispatch({ type: "UPDATE_DATA", payload: newData });
    });
  }, []);

  const RanderCards = () => {
    let saveCards: Array<React.ReactElement> = [];
    let counter: number;

    if (state.data.length !== 0) {
      counter = state.data.length;
      return (
        <Table
          verticalSpacing="xs"
          horizontalSpacing="xs"
          withRowBorders={false}
        >
          <Table.Tbody>
            {state.data.map((card) => {
              saveCards.push(
                <Table.Td key={crypto.randomUUID()}>
                  <Card data={card} />
                </Table.Td>
              );
              if (counter < 3 && counter === saveCards.length)
                return (
                  <Table.Tr key={crypto.randomUUID()}>{saveCards}</Table.Tr>
                );

              if (saveCards.length === 3) {
                counter -= 3;

                const newSaveCards = [...saveCards];
                saveCards = [];
                return (
                  <Table.Tr key={crypto.randomUUID()}>{newSaveCards}</Table.Tr>
                );
              }
            })}
          </Table.Tbody>
        </Table>
      );
    }
  };

  return (
    <section>
      <Title style={{ marginTop: "15px" }} className="app__title">
        SpaceX Launches 2020
      </Title>
      <div className="app__card-list">
        <RanderCards />
      </div>
    </section>
  );
};

export default CardList;
