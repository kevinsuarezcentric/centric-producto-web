import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgIf } from '@angular/common';
import { Utils } from '../../utils/utils';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports:[ ReactiveFormsModule, MaterialModule, TablerIconsModule, NgIf, TranslateModule],
  selector: 'app-centric-input',
  templateUrl: './centric-input.component.html',
  styleUrls: ['./centric-input.component.scss']
})
export class CentricInputComponent implements OnInit {
  @Input() label: string;
  @Input() readonly: boolean;
  @Input() required: boolean;
  @Input() placeholder: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() showButtonSearch: boolean;

  @Output()
  searchEvent = new EventEmitter<any>();

  @Output()
  onClickEvent = new EventEmitter<any>();


  constructor() {}


  ngOnInit(): void {
  }

  searchEventClick(event: any) {
    this.searchEvent.emit(event);
  }

  onclick(event: any) {
    this.onClickEvent.emit(event);
  }

  // setControlValidators(): void {
  //   const control = this.getControl();

  //   const validators = [];

  //   if (this.required) {
  //     validators.push(Validators.required);
  //   }



  //   control.setValidators(validators);
  //   control.updateValueAndValidity();
  // }

  getControl(): FormControl {
     const control= this.formGroup.get(this.controlName) as FormControl;
     return control;
  }


  isRequiredFieldInvalid(): boolean {
    const control = this.getControl();
    return Utils.isValidField(control,'required');
  }

  isPatternFieldInvalid(): boolean {
    const control = this.getControl();
    return Utils.isValidField(control,'pattern');
  }

  isMaxFieldInvalid(): boolean {
    const control = this.getControl();
    return Utils.isValidField(control,'maxlength');
  }



}
