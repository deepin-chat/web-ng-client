import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module'; 
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  imports: [
    SharedModule,
    LayoutModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
