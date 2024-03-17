import { MessageModel } from "./message.model";
import { UserModel } from "./user.model";

export enum ChatType {
    group = 1,
    direct = 2
}
export interface ChatListItem {
    id: number;
    name: string;
    picture: string;
    updateAt: Date;
    type: ChatType;
    lastMessage: MessageModel;
}
export interface ChatModel {
    id: number;
    type: ChatType;
    createdAt: Date;
    updateAt: Date;
    members: ChatMemberModel[];
    chatInfo: ChatInfo;
}
export interface ChatMemberModel {
    userId: string;
    createdAt?: Date;
    user: UserModel;
}
export interface DirectChatRequest {
    userId: string;
}
export interface ChatInfo {
    name: string;
    link: string;
    description: string;
    picture: string;
    isPrivate: boolean;
    ownerId: string;
    adminIds: string[]
}

export interface ChatInfoRequest {
    name: string;
    link: string;
    description: string;
    pictureId: string;
    isPrivate: boolean;
}