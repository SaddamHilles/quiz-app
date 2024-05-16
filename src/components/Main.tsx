import React from 'react';

interface Props {
  children: React.ReactNode;
}
const Main = ({ children }: Props) => {
  return <main className="main">{children}</main>;
};

export default Main;
