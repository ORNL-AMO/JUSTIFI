import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-table-pagination',
    templateUrl: './table-pagination.component.html',
    styleUrl: './table-pagination.component.css',
    standalone: false
})
export class TablePaginationComponent {
  @Input({ required: true })
  pageNumber: number;
  @Input({ required: true })
  collectionSize: number;
  @Input({ required: true })
  itemsPerPage: number;
  @Output('emitPageNumber')
  emitPageNumber: EventEmitter<number> = new EventEmitter<number>();

  pageNumberOptions: Array<number>;
  numberOfPages: number;

  ngOnInit() {
    this.setValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    //update values on collection size change or items per page change
    if ((changes['collectionSize'] && !changes['collectionSize'].firstChange) || (changes['itemsPerPage'] && !changes['itemsPerPage'].firstChange)) {
      this.setValues();
    }
  }

  setValues() {
    this.numberOfPages = Math.ceil(this.collectionSize / this.itemsPerPage);
    this.pageNumberOptions = new Array();
    for (let i = 1; i <= this.numberOfPages; i++) {
      this.pageNumberOptions.push(i);
    }
  }

  setPageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.emitPageNumber.emit(this.pageNumber);
  }
}
