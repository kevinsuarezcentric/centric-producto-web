import { NgModule } from '@angular/core';
import { CentricInputComponent } from './centric-input/centric-input.component';
import { CentricSelectComponent } from './centric-select/centric-select.component';
import { CentricPageLayoutComponent } from './centric-page-layout/centric-page-layout.component';
import { CentricAutocompleteComponent } from './centric-autocomplete/centric-autocomplete.component';
import { CentricConfirmComponent } from './centric-confirm/centric-confirm.component';
import { CentricDateComponent } from './centric-date/centric-date.component';
import { CentricTableComponent } from './centric-table/centric-table.component';


@NgModule({
  imports: [
    CentricInputComponent,
    CentricSelectComponent,
    CentricPageLayoutComponent,
    CentricAutocompleteComponent,
    CentricConfirmComponent,
    CentricDateComponent,
    CentricTableComponent
  ],
  declarations: [],
  exports: [
    CentricInputComponent,
    CentricSelectComponent,
    CentricPageLayoutComponent,
    CentricAutocompleteComponent,
    CentricConfirmComponent,
    CentricDateComponent,
    CentricTableComponent
  ],
})
export class CentricModule {}
