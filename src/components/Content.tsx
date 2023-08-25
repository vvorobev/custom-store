import { FC } from "react";
import { useCountSelector } from "../store/count.store";

export interface ContentProps {}

const Content: FC<ContentProps> = () => {
  const amount = useCountSelector((state) => state.amount);

  return (
    <div className="content">
      <div>Content</div>
      <p>amount: {amount}</p>
    </div>
  );
};

export default Content;
