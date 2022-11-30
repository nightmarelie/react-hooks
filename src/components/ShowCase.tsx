import { FC } from "react";

type ShowCaseProps = {
  title: string;
  children: JSX.Element;
};

export const ShowCase: FC<ShowCaseProps> = ({ title, children }) => {
  return (
    <>
      <hr />
      <h2>{title}</h2>
      {children}
      <hr />
    </>
  );
};
