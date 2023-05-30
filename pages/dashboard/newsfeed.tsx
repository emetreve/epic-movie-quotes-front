import { useNewsFeed } from '@/hooks';
import { Header } from '@/components';

const Newsfeed = () => {
  const { logged } = useNewsFeed();

  if (logged) {
    return (
      <div className='bg-gradient-violet min-h-screen'>
        <Header />
      </div>
    );
  }
};
export default Newsfeed;
