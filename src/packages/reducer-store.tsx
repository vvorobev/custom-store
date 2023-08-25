import {
  Dispatch,
  FC,
  ReactNode,
  Reducer,
  ReducerAction,
  ReducerState,
  createContext,
  useContext,
  useReducer,
} from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createReducerStore = <R extends Reducer<any, any>>(
  reducer: R,
  initializerArg: ReducerState<R>
) => {
  const Context = createContext<
    [ReducerState<R>, Dispatch<ReducerAction<R>>] | null
  >(null);

  const Provider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initializerArg);

    return (
      <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
    );
  };

  const useStore = () => {
    const store = useContext(Context);
    if (!store) {
      throw new Error("Can not use `useStore` outside of the `Provider`");
    }
    return store;
  };

  return { Provider, useStore };
};

export default createReducerStore;
