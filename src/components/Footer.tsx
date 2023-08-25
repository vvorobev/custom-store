import { FC } from "react";
import { ReducerActionTypes, useCountUpdate, useReducerStore } from "../store";

export interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const update = useCountUpdate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, dispatch] = useReducerStore();
  return (
    <footer>
      <h2>Footer</h2>
      <div className="footer__button_group">
        <button
          onClick={() =>
            update((state) => ({ ...state, count: state.count + 1 }))
          }
        >
          Increase Count
        </button>
        <button
          onClick={() =>
            update((state) => ({ ...state, amount: state.amount + 1 }))
          }
        >
          Increase amount
        </button>

        <button onClick={() => dispatch({ type: ReducerActionTypes.INCREASE })}>
          Increase reducer count
        </button>
      </div>
    </footer>
  );
};

export default Footer;
