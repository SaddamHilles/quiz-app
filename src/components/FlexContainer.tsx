import { PropsWithChildren } from 'react';

const FlexContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className='flex'>{children}</div>;
};

export default FlexContainer;
