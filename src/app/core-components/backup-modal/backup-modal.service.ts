import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackupModalService {
  showImportModal: BehaviorSubject<boolean>;
  showExportModal: BehaviorSubject<boolean>;

  constructor() {
    this.showImportModal = new BehaviorSubject<boolean>(false);
    this.showExportModal = new BehaviorSubject<boolean>(false);
  }
}
