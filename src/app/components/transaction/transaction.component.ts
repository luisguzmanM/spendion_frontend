import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule
  ],
})

export class TransactionComponent implements AfterViewInit, OnInit  {

  @Input() transactions: any;
  displayedColumns: string[] = ['id', 'desc', 'amount'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.transactions);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}