import { PagedQuery } from "./pagination.model";
import { UserProfileModel } from "./user.model";

export interface MessageModel {
    id: string;
    chatId: number;
    text: string;
    replayTo: string;
    isRead: boolean;
    createdAt: Date;
    updateAt: Date;
    from: UserProfileModel;
}

export interface MessageQuery extends PagedQuery {
    chatId?: number;
    from?: string;
    keywords?: string;
}

export interface MessageRequest {
    chatId: number;
    text: string;
    replyTo: string;
}