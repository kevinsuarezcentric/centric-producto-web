import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Catalogo } from '../../interfaces/catalogo.interface';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgFor, NgIf } from '@angular/common';
import { Utils } from '../../utils/utils';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports:[ ReactiveFormsModule, MaterialModule, TablerIconsModule, NgIf, NgFor, TranslateModule],
  selector: 'app-centric-select',
  templateUrl: './centric-select.component.html',
  styleUrls: ['./centric-select.component.scss']
})
export class CentricSelectComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() options: Catalogo[]; // Aquí puedes definir el tipo específico de tus opciones
  @Input() controlName: string;
  @Input() required: boolean;
  @Input() label: string;
  @Input() readonly: boolean;


  @Output()
  onChangeEvent = new EventEmitter<string>();

  //@Output() selectionChange = new EventEmitter<any>();
  public defaultOption: Catalogo = { id: '', desc: 'Seleccione' };
  public placeholder: string;

  constructor() { }
  ngOnInit(): void {
    this.placeholder = "Seleccione";
  }


  getControl(): FormControl {

    const control = this.formGroup.get(this.controlName) as FormControl;
    return control;
  }

  // onSelectionChange(value: any) {
  //   this.selectionChange.emit(value);
  // }

  isRequiredFieldInvalid(): boolean {
    const control = this.getControl();
    return Utils.isValidField(control,'required');
  }


  getSelectedOptionLabel(): string {
    const control = this.getControl();
    const selectedOption = this.options.find(option => option.id === control.value);
    return selectedOption ? selectedOption.desc : '';
  }


  onSelectionChange(event: any) {
    this.onChangeEvent.emit(event.value);
  }

}
