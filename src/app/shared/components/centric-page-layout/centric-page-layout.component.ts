import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';

@Component({
  standalone: true,
  imports:[ ReactiveFormsModule, MaterialModule, TablerIconsModule, CommonModule, TranslateModule],
  selector: 'app-centric-page-layout',
  templateUrl: './centric-page-layout.component.html',
  styleUrls: ['./centric-page-layout.component.scss']
})
export class CentricPageLayoutComponent {
  @Input() sidebarTemplate: TemplateRef<any>;
  @Input() contentTemplate: TemplateRef<any>;
  @Input() headerTemplate: TemplateRef<any>;
  @Input() pageTitle: string;
}
