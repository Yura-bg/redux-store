export type User = {
  id: number;
  name: string;
  surname: string;
  nickname: string;
};


export type Task = {
  id: number;
  name: string;
  description: string;
  userId: number;
};
