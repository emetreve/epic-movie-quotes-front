import { Header } from '@/components';
import { useMovies } from '@/hooks';

const Movies = () => {
  const { user, logged, handleOutsideClick } = useMovies();
  if (logged) {
    return (
      <div onClick={handleOutsideClick} className='min-h-screen'>
        <Header
          hideSearch={true}
          userName={user.name}
          avatar={user.avatar}
          authUserId={user.id}
        />
        <h1>MOVIES HERE</h1>
      </div>
    );
  }
};
export default Movies;
