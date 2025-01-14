import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SharedDataService } from '../shared/shared-services/shared-data.service';
import { Subscription } from 'rxjs';
import { ContactContext, IdbContact } from '../models/contact';
import { SetupWizardService } from './setup-wizard.service';
import { faGripLinesVertical, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-setup-wizard',
  templateUrl: './setup-wizard.component.html',
  styleUrl: './setup-wizard.component.css'
})
export class SetupWizardComponent {

  @ViewChild('pageContent', { static: false }) pageContent: ElementRef;

  faGripVertical: IconDefinition = faGripLinesVertical;

  displayContactModal: { context: ContactContext, viewContact: IdbContact, contextGuid: string, companyId: string };
  displayContactModalSub: Subscription;

  sidebarWidth: number = 200;
  helpWidth: number = 200;
  contentWidth: number;
  startingCursorX: number;
  isDraggingSidebar: boolean = false;
  isDraggingHelp: boolean = false;
  sidebarCollapsed: boolean = false;
  constructor(private sharedDataService: SharedDataService,
    private setupWizardService: SetupWizardService
  ) {

  }

  ngOnInit() {
    this.sidebarWidth = this.setupWizardService.sidebarWidth;
    this.helpWidth = this.setupWizardService.helpWidth;
    this.displayContactModalSub = this.sharedDataService.displayContactModal.subscribe(_displayContactModal => {
      this.displayContactModal = _displayContactModal;
    });
    this.setContentWidth();
  }

  ngOnDestroy() {
    this.displayContactModalSub.unsubscribe();
    this.setupWizardService.sidebarWidth = this.sidebarWidth;
    this.setupWizardService.helpWidth = this.helpWidth;
  }

  closeContactModal() {
    this.sharedDataService.displayContactModal.next(undefined);
  }

  startResizingSidebar(event: MouseEvent): void {
    this.startingCursorX = event.clientX;
    this.isDraggingSidebar = true;
  }

  startResizingHelp(event: MouseEvent): void {
    this.startingCursorX = event.clientX;
    this.isDraggingHelp = true;
  }

  stopResizing($event: MouseEvent) {
    this.isDraggingSidebar = false;
    this.isDraggingHelp = false;
    this.setupWizardService.setHelpWidth(this.helpWidth);
    this.setupWizardService.setSidebarWidth(this.sidebarWidth);
  }

  drag(event: MouseEvent) {
    if (this.isDraggingSidebar) {
      if (event.clientX > 50) {
        this.sidebarWidth = event.clientX;
        this.setupWizardService.sidebarOpen.next(true);
      } else {
        this.sidebarWidth = 50;
        this.setupWizardService.sidebarOpen.next(false);
      }
      this.setContentWidth();
    }
    if (this.isDraggingHelp) {
      let helpWidth: number = (window.innerWidth - event.clientX)
      if (helpWidth > 50) {
        this.helpWidth = helpWidth;
        this.setupWizardService.helpPanelOpen.next(true);
      } else {
        this.helpWidth = 50;
        this.setupWizardService.helpPanelOpen.next(false);
      }
      this.setContentWidth();
    }
  }


  toggleCollapseSidebar(sidebarOpen: boolean) {
    this.setupWizardService.sidebarOpen.next(sidebarOpen);
    if (sidebarOpen) {
      this.sidebarWidth = 200;
    } else {
      this.sidebarWidth = 50;
    }
    this.setContentWidth();
  }

  toggleCollapseHelp(helpPanelOpen: boolean) {
    this.setupWizardService.helpPanelOpen.next(helpPanelOpen);
    if (helpPanelOpen) {
      this.helpWidth = 200;
    } else {
      this.helpWidth = 50;
    }
    this.setContentWidth();
  }

  setContentWidth() {
    let contentWidth: number = (window.innerWidth - this.helpWidth - this.sidebarWidth);
    if(contentWidth < 600){
      this.contentWidth = 600;
    }else{
      this.contentWidth = contentWidth;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setContentWidth();
  }
}
