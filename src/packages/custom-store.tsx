import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { inFunction } from "../types";

type Listener<TState> = (state: TState) => void;

class Store<TState extends object> {
  private listeners = new Set<Listener<TState>>();
  private state: TState;

  constructor(initialState: TState) {
    this.state = initialState;
  }

  public getState() {
    return this.state;
  }

  public update(
    partialNewState: Partial<TState> | ((state: TState) => TState)
  ) {
    this.state = inFunction(partialNewState)
      ? partialNewState(this.state)
      : Object.assign({}, this.state, partialNewState);

    this.listeners.forEach((listener) => {
      listener(this.state);
    });
  }

  public subscribe(listener: Listener<TState>) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

const createStoreContext = <
  State extends Record<string | number | symbol, unknown>
>(
  initialState: State,
  providerDisplayName = "StoreProvider"
) => {
  const Context = createContext<Store<State> | null>(null);

  const Provider: FC<{ children: ReactNode }> = ({ children }) => {
    const store = useMemo(() => new Store(initialState), []);

    return <Context.Provider value={store}>{children}</Context.Provider>;
  };
  Provider.displayName = providerDisplayName;

  const useStore = () => {
    const store = useContext(Context);
    if (!store) {
      throw new Error("Can not use `useStore` outside of the `Provider`");
    }
    return store;
  };

  const useStateSelector = <Result,>(
    selector: (state: State) => Result
  ): Result => {
    const store = useStore();
    const [state, setState] = useState(() => selector(store.getState()));
    const selectorRef = useRef(selector);
    const stateRef = useRef(state);

    useLayoutEffect(() => {
      selectorRef.current = selector;
      stateRef.current = state;
    });

    useEffect(() => {
      return store.subscribe(() => {
        const state = selectorRef.current(store.getState());

        if (stateRef.current === state) {
          return;
        }

        setState(state);
      });
    }, [store]);

    return state;
  };

  const useUpdate = () => {
    const store = useStore();

    return store.update.bind(store);
  };

  return { Provider, useStateSelector, useUpdate };
};

export default createStoreContext;
