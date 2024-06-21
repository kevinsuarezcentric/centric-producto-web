import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';

@Component({
  standalone: true,
  imports:[ ReactiveFormsModule, MaterialModule, TablerIconsModule, NgIf, NgFor, UpperCasePipe, TranslateModule],
  selector: 'app-centric-table',
  templateUrl: './centric-table.component.html',
  styleUrls: ['./centric-table.component.scss']
})
export class CentricTableComponent implements OnInit{

  @Input() columns: { name: string, key: string, width?: string }[] = [];
  @Input() dataSource = new MatTableDataSource<any>;
  @Output() goEdit = new EventEmitter<any>();
  @Output() goView = new EventEmitter<any>();
  @Output() deleteCompania = new EventEmitter<any>();

  public displayedColumns: string[] = [];


  ngOnInit(): void {
    this.displayedColumns = this.displayedColumns?.concat(this.columns.map(column => column.key));
  }


  goEditClick(obj:any){
    this.goEdit.emit(obj);
  }

  goViewClick(obj:any){
    this.goView.emit(obj);
  }

  deleteCompaniaClick(obj:any){
    this.deleteCompania.emit(obj);
  }

}
