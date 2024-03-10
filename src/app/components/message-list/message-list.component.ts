import { CdkVirtualScrollViewport, ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MessageDataSource } from './services/message.datasource';
import { MessageService } from '../../core/services/message.service';
import { MessageModel } from '../../core/models/message.model';
import { SharedModule } from '../../shared/shared.module';
import { ChatHubService } from '../../core/services/chat-hub.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ScrollingModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class MessageListComponent implements OnInit, OnChanges {
  @Input() chatId: number = 0;
  @ViewChild('scrollViewport') virtualScrollViewport?: CdkVirtualScrollViewport;
  userId?: string;
  dataSource?: MessageDataSource;

  constructor(
    private scrollDispatcher: ScrollDispatcher,
    private messageService: MessageService,
    private chatHubService: ChatHubService,
    private userService: UserService
  ) {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['chatId'] && changes['chatId'].currentValue !== changes['chatId'].previousValue) {
      this.buildDataSource(changes['chatId'].currentValue);
    }
  }
  ngAfterViewInit(): void {
    this.scrollDispatcher.scrolled()
      .subscribe((data) => {
        const scrollTop = data?.getElementRef().nativeElement.scrollTop;
        console.log(data?.getElementRef().nativeElement.scrollTop, data?.getElementRef().nativeElement.scrollHeight, data?.getElementRef().nativeElement.clientHeight, data?.getElementRef().nativeElement.offsetHeight);

        if (scrollTop === 0) {
          this.dataSource?.loadMore();
        }
      });
    setTimeout(() => {
      this.scrollToBottom();
    }, 200);
  }
  private buildDataSource(id: number) {
    this.dataSource = new MessageDataSource(id, this.messageService, this.chatHubService);
    // this.dataSource?.newMessagePushed.subscribe(() => {
    //   const element = this.virtualScrollViewport?.elementRef.nativeElement;
    //   if (element && ((element.scrollHeight - element.scrollTop) >= element.clientHeight)) {
    //     this.scrollToBottom();
    //   }
    // });
    this.dataSource?.load();
  }

  ngOnInit() {
    this.userService.current
      .subscribe(res => {
        this.userId = res.userId;
      })
    this.buildDataSource(this.chatId);
  }
  private scrollToBottom() {
    this.virtualScrollViewport?.scrollTo({
      bottom: 0,
      behavior: 'smooth'
    });
  }
  trackByFn(index: number, item: MessageModel) {
    return item.id;
  }

}
