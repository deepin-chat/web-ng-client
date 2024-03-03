import { UserProfileModel } from "./user.model";

export enum ChatType {
    private = 1,
    group = 2,
    channel = 3
}
export interface ChatModel {
    id: number;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    IsPrivate: boolean;
    groupInfo: ChatGroupInfoModel;
}
export interface ChatMemberModel {
    isAdmin: boolean;
    isOwner: boolean;
    joinedAt: Date;
    user: UserProfileModel;
}
export interface ChatGroupInfoModel {
    name: string;
    avatarBlobId: string;
    link: string;
    description: string;
}
export interface NewGroupChatModel {
    name: string;
    avatarBlobId: string;
    link: string;
    description: string;
    isPrivate: boolean;
}