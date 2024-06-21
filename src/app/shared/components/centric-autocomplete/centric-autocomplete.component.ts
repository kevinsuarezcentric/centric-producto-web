import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Catalogo } from '../../interfaces/catalogo.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Utils } from '../../utils/utils';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  standalone: true,
  imports:[ ReactiveFormsModule, MaterialModule, TablerIconsModule,CommonModule, TranslateModule],
  selector: 'app-centric-autocomplete',
  templateUrl: './centric-autocomplete.component.html',
  styleUrls: ['./centric-autocomplete.component.scss']
})
export class CentricAutocompleteComponent implements OnInit {



  @Input() label: string;
  @Input() formGroup: FormGroup;
  @Input() options: Catalogo[];
  @Input() readonly: boolean;
  @Input() required: boolean;
  @Input() controlName: string;

  public placeholder: string;
  public filteredOptions: Catalogo[];
  constructor() { }

  ngOnInit(): void {
    this.placeholder = 'Selecione';
    this.filteredOptions = []

  }


  search() {
    this.filteredOptions = this.options;
    const value: string = this.getControl().value || '';
    this.filteredOptions = this.filteredOptions.filter(option => option.desc.toLowerCase().includes(value));
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if ( !event.option.value ) {
      return;
    }
    const option: Catalogo = event.option.value;
    this.getControl().setValue(option.desc);
  }

  getControl(): FormControl {
    const control = this.formGroup.get(this.controlName) as FormControl;
    return control;
  }

  isRequiredFieldInvalid(): boolean {
    const control = this.getControl();
    return Utils.isValidField(control, 'required');
  }

}
