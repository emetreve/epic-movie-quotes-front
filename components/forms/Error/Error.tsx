import { PropsType } from './types';

const Error: React.FC<PropsType> = ({ content }) => {
  return (
    <div>
      <p className='text-red tracking-tight'>{content}</p>
    </div>
  );
};
export default Error;
