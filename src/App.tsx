import { FC } from "react";
import { Content, Footer, Header } from "./components";
import { CountProvider } from "./store/count.store";
import { ReducerProvider } from "./store/reducer.store";

const App: FC = () => {
  return (
    <CountProvider>
      <ReducerProvider>
        <Header />
        <Content />
        <Footer />
      </ReducerProvider>
    </CountProvider>
  );
};

export default App;
