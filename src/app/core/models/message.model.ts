import { PagedQuery } from "./pagination.model";
import { UserProfile } from "./user.model";

export interface MessageModel {
    id: string;
    chatId: number;
    text: string;
    replayTo: string;
    isRead: boolean;
    createdAt: Date;
    updateAt: Date;
    from: string;
    fromUser: UserProfile;
}

export interface MessageQuery extends PagedQuery {
    chatId?: number;
    from?: string;
    keywords?: string;
}

export interface MessageRequest {
    chatId: number;
    text: string;
    replyTo?: string;
}