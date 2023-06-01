export type PropsType = {
  show: MouseEventHandler<HTMLButtonElement>;
  swap: MouseEventHandler<HTMLButtonElement>;
};

export type FormData = {
  user: string;
  password: string;
  remember?: boolean;
};
