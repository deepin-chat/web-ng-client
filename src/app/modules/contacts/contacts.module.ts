import { NgModule } from '@angular/core';
import { ContactsComponent } from './contacts.component';
import { SharedModule } from '../../shared/shared.module';
import { ContactsRoutingModule } from './contacts-routing.module';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  imports: [
    SharedModule,
    LayoutModule,
    ContactsRoutingModule
  ],
  declarations: [ContactsComponent]
})
export class ContactsModule { }
