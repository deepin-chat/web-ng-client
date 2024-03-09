import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SharedModule } from '../../shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  imports: [
    SharedModule,
    LayoutModule,
    SearchRoutingModule
  ],
  declarations: [SearchComponent]
})
export class SearchModule { }
