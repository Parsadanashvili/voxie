export interface User {
  id: string | number | null;
  username?: string | null;
  email?: string | null;
  avatar?: string | null;
  currentRoomId?: string | number | null;
}
