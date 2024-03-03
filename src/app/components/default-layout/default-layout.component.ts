import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ChatHubService } from '../../core/services/chat-hub.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    NzLayoutModule
  ]
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {

  constructor(private chatHubService: ChatHubService) { }


  ngOnInit() {
    this.chatHubService.start();
  }

  ngOnDestroy(): void {
    this.chatHubService.stop();
  }

}
