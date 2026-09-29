import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

type PageNumberOption = number | 'ellipsis';

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

  pageNumberOptions: Array<PageNumberOption> = [];
  numberOfPages: number;

  ngOnInit() {
    this.setValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pageNumber'] || changes['collectionSize'] || changes['itemsPerPage']) {
      this.setValues();
    }
  }

  setValues() {
    this.numberOfPages = Math.ceil(this.collectionSize / this.itemsPerPage);
    this.pageNumber = Math.min(Math.max(this.pageNumber || 1, 1), Math.max(this.numberOfPages, 1));
    this.pageNumberOptions = this.getPageNumberOptions();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > this.numberOfPages || pageNumber === this.pageNumber) {
      return;
    }

    this.pageNumber = pageNumber;
    this.pageNumberOptions = this.getPageNumberOptions();
    this.emitPageNumber.emit(this.pageNumber);
  }

  private getPageNumberOptions(): Array<PageNumberOption> {
    if (this.numberOfPages <= 7) {
      return Array.from({ length: this.numberOfPages }, (_, index) => index + 1);
    }

    if (this.pageNumber <= 4) {
      return [1, 2, 3, 4, 5, 'ellipsis', this.numberOfPages];
    }

    if (this.pageNumber >= this.numberOfPages - 3) {
      return [
        1,
        'ellipsis',
        this.numberOfPages - 4,
        this.numberOfPages - 3,
        this.numberOfPages - 2,
        this.numberOfPages - 1,
        this.numberOfPages
      ];
    }

    return [
      1,
      'ellipsis',
      this.pageNumber - 1,
      this.pageNumber,
      this.pageNumber + 1,
      'ellipsis',
      this.numberOfPages
    ];
  }
}
