import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    NzLayoutModule
  ]
})
export class AccountLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
