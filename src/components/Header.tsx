import { FC } from "react";
import { useCountSelector } from "../store/count.store";
import { useReducerStore } from "../store/reducer.store";

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const count = useCountSelector((state) => state.count);
  const [state] = useReducerStore();
  return (
    <header>
      <h1>Header</h1>
      <p>Count: {count}</p>
      <p>Reducer: {state.count}</p>
    </header>
  );
};

export default Header;
