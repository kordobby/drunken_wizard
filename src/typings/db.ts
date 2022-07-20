import { Dispatch, SetStateAction } from "react";

// signUp
export interface IUser {
  username: string;
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
}

// login
export interface LogUser {
  username: string;
  password: string;
}
export interface loginStateProps {
  setLoginState: Dispatch<SetStateAction<boolean>>;
}

// modal
export interface ModalType {
  modalClose: () => void;
}

// chatList
export interface ChatType {
  type: string;
  message: string;
  sender: string;
}

// createroom
export interface AddRoomType {
  roomName: string;
}

// joinroom
export interface JoinRoomType {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

// waitngroom
export interface WaitingRoom {
  roomId: string | undefined;
  id: string;
}

// roompgae
export interface RoomPage {
  page: number;
}
export interface PageProps {
  page: number;
}

export type PageNum = {
  queryKey: [string, { page: number }];
};
