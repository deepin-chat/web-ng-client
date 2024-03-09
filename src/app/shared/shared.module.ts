import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ShortDatePipe } from './pipes/short-date.pipe';
import { SubStringPipe } from './pipes/sub-string.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ShortDatePipe,
    SubStringPipe
  ],
  exports: [
    CommonModule,
    ShortDatePipe,
    SubStringPipe
  ],
  providers: [
    DatePipe
  ]
})
export class SharedModule { }
