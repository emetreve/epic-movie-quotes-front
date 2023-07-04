import { PropsType } from './types';
import useLayout from './useLayout';
import { Header, SideProfilePanel } from '@/components';

const Layout: React.FC<PropsType> = ({ children }) => {
  const { renderHeader, user, hideSearch, asPath } = useLayout();

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
          <div
            className={`
            ${!asPath.includes('profile') ? 'w-[25%] fixed' : 'relative'}
             z-[200]`}
          >
            <SideProfilePanel avatar={user.avatar} name={user.name} />
          </div>
        </>
      )}
      {children}
    </div>
  );
};

export default Layout;
