import { useUiContext } from '@/store';

const useChangeName = () => {
  const { showUpdateName } = useUiContext();

  return { showUpdateName };
};
export default useChangeName;
