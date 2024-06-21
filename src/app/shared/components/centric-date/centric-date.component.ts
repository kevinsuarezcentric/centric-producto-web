import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgIf } from '@angular/common';
import { Utils } from '../../utils/utils';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports:[ ReactiveFormsModule, MaterialModule, TablerIconsModule, NgIf, TranslateModule],
  selector: 'app-centric-date',
  templateUrl: './centric-date.component.html',
  styleUrls: ['./centric-date.component.scss']
})
export class CentricDateComponent implements OnInit {

  @Input() label: string;
  @Input() formGroup: FormGroup;
  @Input() readonly: boolean;
  @Input() required: boolean;
  @Input() controlName: string;

  constructor() { }

  ngOnInit(): void {
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
