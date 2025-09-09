import * as React from "react";

export type ButtonProps = {
  children: React.ReactNode;
};

export const Button = ({ children }: ButtonProps) => {
  return <button style={{ padding: "0.5rem 1rem" }}>{children}</button>;
};
