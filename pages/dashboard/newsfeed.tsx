import { useNewsFeed } from '@/hooks';

const Newsfeed = () => {
  const { logged } = useNewsFeed();

  if (logged) {
    return <div>NEWS FEED</div>;
  }
};
export default Newsfeed;
