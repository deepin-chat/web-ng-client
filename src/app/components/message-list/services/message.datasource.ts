import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, Subject, firstValueFrom, from } from "rxjs";
import { MessageModel } from "../../../core/models/message.model";
import { MessageService } from "../../../core/services/message.service";
import { ChatHubService } from "../../../core/services/chat-hub.service";

export class MessageDataSource extends DataSource<MessageModel> {
    private readonly _dataStream = new BehaviorSubject<Array<MessageModel>>([]);

    public isLoading = false;
    public isLastPage = false;
    public totalCount = 0;
    private pageIndex = 0;
    private pageSize = 10;

    private readonly _newMessageSubject = new Subject<void>();
    public newMessagePushed = this._newMessageSubject.asObservable();

    connect(collectionViewer: CollectionViewer): Observable<readonly MessageModel[]> {
        return this._dataStream;
    }
    disconnect(collectionViewer: CollectionViewer) {
        this._dataStream.complete();
    }
    constructor(
        private chatId: number,
        private messageService: MessageService,
        private chatHubService: ChatHubService
    ) {
        super();
        this.chatHubService.message.subscribe(msg => {
            if (msg.chatId === this.chatId) {
                this.updateData([msg]);
                this._newMessageSubject.next();
            }
        });
    }

    updateData(items: MessageModel[]) {
        const mergedMessages = new Set([...this._dataStream.value, ...items]);
        this.totalCount = mergedMessages.size;
        this._dataStream.next(Array.from(mergedMessages).sort((a, b) => {
            return (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime();
        }));
    }

    loadMore() {
        if (this.isLastPage || this.isLoading) return;
        this.pageIndex++;
        this.load();
    }

    load() {
        if (this.isLoading) return;
        this.isLoading = true;
        this.messageService.getPagedList({
            chatId: this.chatId,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        }).subscribe({
            next: (res) => {
                this.isLastPage = res.totalPages === this.pageIndex + 1;
                this.updateData(res.items);
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }
}