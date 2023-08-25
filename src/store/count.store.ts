import { createStoreContext } from "../packages";

const { Provider, useStateSelector, useUpdate } = createStoreContext(
  {
    count: 0,
    amount: 0,
  },
  "CounterProvider"
);

// const { Provider, useStateSelector, useUpdate } = createStoreContext([1]);

export {
  Provider as CountProvider,
  useStateSelector as useCountSelector,
  useUpdate as useCountUpdate,
};
