import { Component, OnInit, Input } from '@angular/core';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'app-gridcolumn',
  template: ''
})
export class GridcolumnComponent implements OnInit {

  @Input() value: any;
  @Input() header: any;
  @Input() sorting = false;
  @Input() width: any;
  @Input() type: any = 'text';
  @Input() imgstyleclass: any;
  constructor(table: GridComponent) {
    table.addColumn(this);
  }

  ngOnInit() {
  }

}
