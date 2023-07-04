import { PropsType } from './types';
import useLayout from './useLayout';
import { Header, SideProfilePanel } from '@/components';

const Layout: React.FC<PropsType> = ({ children }) => {
  const { renderHeader, user, hideSearch } = useLayout();

  return (
    <div className='min-h-screen min-w-screen bg-gradient-violet'>
      {renderHeader && user && (
        <>
          <div className='h-[5rem]'>
            <Header
              userName={user.name}
              avatar={user.avatar}
              authUserId={user.id}
              hideSearch={hideSearch}
            />
          </div>
          <div className='w-[25%] fixed z-[2]'>
            <SideProfilePanel avatar={user.avatar} name={user.name} />
          </div>
        </>
      )}
      {children}
    </div>
  );
};

export default Layout;
