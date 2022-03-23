import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder.directive';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective,
  ],
  imports: [CommonModule],
  exports: [
    DropdownDirective,
    PlaceholderDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    CommonModule,
  ],
})
export class SharedModule {}