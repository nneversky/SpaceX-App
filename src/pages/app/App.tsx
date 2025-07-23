import { MantineProvider } from "@mantine/core";
import CardList from "../../modules/CardList";
import "@mantine/core/styles.css";
import "./App.css";

const App = () => {
  return (
    <section className="app">
      <MantineProvider>
        <CardList />
      </MantineProvider>
    </section>
  );
};

export default App;
