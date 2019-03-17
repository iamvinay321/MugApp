import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { GridcolumnComponent } from '../gridcolumn/gridcolumn.component';
import { PagerService } from '../pager.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [PagerService]
})

export class GridComponent implements OnInit, OnChanges {
  Math: any;
  keyword: any = '';
  columns: GridcolumnComponent[] = [];
  @Input() dataset: any[] = [];
  @Input() page = 1;
  @Input() size: any = 10;
  @Input() sortColumn: any = '';
  @Input() sortDirection: any = 1;
  @Input() rows: any = 0;
  @Input() searchText: any = 'Search';
  @Output() handler: EventEmitter<any> = new EventEmitter<any>();
  eventOutput = {
    page: this.page,
    size: this.size,
    keyword: this.keyword,
    sortColumn: this.sortColumn,
    sortDirection: this.sortDirection
  };

  totalPages: any;
  pager: any = {};
  pagedItems: any[];

  ngOnChanges(changes: any): void {
    if (changes.rows !== undefined) {
      this.rows = changes.rows.currentValue;
      if (this.rows !== 0) {
        this.sortColumn = this.columns[0].value;
        this.setPage(this.page);
      }
    }
    if (changes.dataset !== undefined) {
      if (changes.dataset.currentValue !== undefined) {
        this.dataset = changes.dataset.currentValue;
      } else {
        this.dataset = [];
      }
    }
  }

  getValue(row: any, columnName) {
    if (columnName.indexOf('.') === -1) {
      return row[columnName];
    } else {
      const columnSplit = columnName.split('.');
      return row[columnSplit[0]][columnSplit[1]];
    }
  }
  constructor(private pagerService: PagerService) {

    this.Math = Math;
  }
  ngOnInit() { }

  addColumn(column: any) {
    this.columns.push(column);
    this.sortColumn = this.columns[0].value;
  }
  setPage(page: number) {
    this.page = page;
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    if (page !== 1) {
      this.handleEvent();
    }
    this.pager = this.pagerService.getPager(this.rows, page, this.size);

  }

  viewImg(img: any) {
    if (img === null || img === '' || img === undefined) {
      return '/assets/img/noimg.jpg';
    } else {
      return img;
    }
  }



  onSort(column: any, direction: any) {
    this.sortColumn = column;
    this.sortDirection = direction;
    this.handleEvent();
  }
  search(event) {
    if (event.keyCode === 13) {
      this.handleEvent();
    }
  }

  handleEvent() {
    this.eventOutput = {
      page: this.page,
      size: this.size,
      keyword: this.keyword,
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection
    };
    this.handler.next(this.eventOutput);
  }

  changePageSize() {
    this.setPage(this.page);
    this.handleEvent();
  }

}
