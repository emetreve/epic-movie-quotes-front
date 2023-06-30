import { PropsType } from './types';
import useLayout from './useLayout';

const Layout: React.FC<PropsType> = ({ children }) => {
  useLayout();

  return <div className='min-h-screen min-w-screen bg-black'>{children}</div>;
};

export default Layout;
