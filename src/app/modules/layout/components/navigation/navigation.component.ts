import { Component, OnInit } from '@angular/core';
import { ThemeType, LayoutService } from '../../../../core/services/layout.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddGroupChatComponent } from '../../../../components/add-group-chat/add-group-chat.component';
import { AddChannelComponent } from '../../../../components/add-channel/add-channel.component';
import { AddPeopleComponent } from '../../../../components/add-people/add-people.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  theme: ThemeType = ThemeType.light;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private layoutService: LayoutService
  ) {
  }

  ngOnInit(): void {
    this.layoutService.theme.subscribe(res => {
      this.theme = res;
    })
  }

  switchTheme() {
    this.layoutService.switchTheme();
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, { paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored' });
  }

  onAddGroup() {
    const dialogRef = this.dialog.open(AddGroupChatComponent, {
      data: null,
      minWidth: '400px'
    });
  }

  onAddChannel() {
    const dialogRef = this.dialog.open(AddChannelComponent, {
      data: null,
      minWidth: '400px'
    });
  }

  
  onAddPeople() {
    const dialogRef = this.dialog.open(AddPeopleComponent, {
      data: null,
      minWidth: '400px'
    });
  }
}
