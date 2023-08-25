import { Reducer } from "react";
import { createReducerStore } from "../packages";

export enum ReducerActionTypes {
  INCREASE = "INCREASE",
}
type State = { count: number };
type Action = { type: ReducerActionTypes };

type StateReducer = Reducer<State, Action>;

const reducer: StateReducer = (state, action) => {
  switch (action.type) {
    case ReducerActionTypes.INCREASE:
      return {
        ...state,
        count: state.count + 1,
      };

    default:
      return state;
  }
};

const { Provider, useStore } = createReducerStore(reducer, { count: 0 });

export { Provider as ReducerProvider, useStore as useReducerStore };
