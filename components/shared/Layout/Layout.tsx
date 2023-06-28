import { PropsType } from './types';

const Layout: React.FC<PropsType> = ({ children }) => {
  return <div className='min-h-screen min-w-screen bg-black'>{children}</div>;
};

export default Layout;
