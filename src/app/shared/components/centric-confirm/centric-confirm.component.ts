import { Component, Inject } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';

@Component({
  standalone: true,
  imports:[ ReactiveFormsModule, MaterialModule, TablerIconsModule, TranslateModule],
  selector: 'app-centric-confirm',
  templateUrl: './centric-confirm.component.html',
  styleUrls: ['./centric-confirm.component.scss']
})
export class CentricConfirmComponent {

  public action:string;
  public msgConfirmationMessage: string;

  constructor(
    private translate: TranslateService,
    public dialogRef: MatDialogRef<CentricConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {
    this.action = 'Eliminar';
    this.msgConfirmationMessage = this.translate.instant('MENSAJE.CONFIRMATION_DELETE').replace('{registro}', data);
    //this.msgConfirmationMessage = message.CONFIRMATION_DELETE.replace('{registro}', data);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm():void {
    this.dialogRef.close(true)
  }

}
