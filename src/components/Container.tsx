import { FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className="app">{children}</div>;
};

export default Container;
