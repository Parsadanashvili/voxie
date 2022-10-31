export interface Room {
  id: number;
  title: string;
  creator: {
    id: number;
    username: string;
    avatar: string;
  };
  users: {
    id: number;
    username: string;
    avatar: string;
  }[];
}
