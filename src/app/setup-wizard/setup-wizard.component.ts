import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SharedDataService } from '../shared/shared-services/shared-data.service';
import { Subscription } from 'rxjs';
import { ContactContext, IdbContact } from '../models/contact';
import { SetupWizardService } from './setup-wizard.service';
import { faChevronCircleLeft, faChevronCircleRight, faGripLinesVertical, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-setup-wizard',
  templateUrl: './setup-wizard.component.html',
  styleUrl: './setup-wizard.component.css',
  standalone: false
})
export class SetupWizardComponent {

  @ViewChild('pageContent', { static: false }) pageContent: ElementRef;

  faChevronCircleRight: IconDefinition = faChevronCircleRight;
  faChevronCircleLeft: IconDefinition = faChevronCircleLeft;
  faGripVertical: IconDefinition = faGripLinesVertical;

  sidebarWidth: number = 200;
  helpWidth: number = 200;
  contentWidth: number;
  startingCursorX: number;
  isDraggingSidebar: boolean = false;
  isDraggingHelp: boolean = false;
  sidebarCollapsed: boolean = false;

  print: boolean;
  printSub: Subscription
  isSmallScreen: boolean = false;
  sidebarCanvasOpen: boolean = false;
  helpPanelCanvasOpen: boolean = false;
  constructor(private sharedDataService: SharedDataService,
    private setupWizardService: SetupWizardService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
        console.log('isSmallScreen:', this.isSmallScreen);
      });
  }

  ngOnInit() {
    this.printSub = this.sharedDataService.print.subscribe(print => {
      this.print = print;
    })
    this.sidebarWidth = this.setupWizardService.sidebarWidth;
    this.helpWidth = this.setupWizardService.helpWidth;
    this.setContentWidth();
  }

  ngOnDestroy() {
    this.setupWizardService.sidebarWidth = this.sidebarWidth;
    this.setupWizardService.helpWidth = this.helpWidth;
    this.printSub.unsubscribe();
  }

  startResizingSidebarTouch(event: TouchEvent): void {
    this.startingCursorX = event.touches[0].clientX;
    this.isDraggingSidebar = true;
  }

  startResizingSidebarMouse(event: MouseEvent): void {
    this.startingCursorX = event.clientX;
    this.isDraggingSidebar = true;
  }

  startResizingHelpTouch(event: TouchEvent): void {
    this.startingCursorX = event.touches[0].clientX;
    this.isDraggingHelp = true;
  }

  startResizingHelpMouse(event: MouseEvent): void {
    this.startingCursorX = event.clientX;
    this.isDraggingHelp = true;
  }

  stopResizing() {
    this.isDraggingSidebar = false;
    this.isDraggingHelp = false;
    this.setupWizardService.setHelpWidth(this.helpWidth);
    this.setupWizardService.setSidebarWidth(this.sidebarWidth);
  }

  dragTouch(event: TouchEvent) {
    this.drag(event.touches[0].clientX);
  }

  dragMouse(event: MouseEvent) {
    this.drag(event.clientX);
  }

  drag(clientX: number) {
    if (this.isDraggingSidebar) {
      if (clientX > 60) {
        this.sidebarWidth = clientX;
        this.setupWizardService.sidebarOpen.next(true);
      } else {
        this.sidebarWidth = 60;
        this.setupWizardService.sidebarOpen.next(false);
      }
      this.setContentWidth();
    }
    if (this.isDraggingHelp) {
      let helpWidth: number = (window.innerWidth - clientX)
      if (helpWidth > 60) {
        this.helpWidth = helpWidth;
        this.setupWizardService.helpPanelOpen.next(true);
      } else {
        this.helpWidth = 60;
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
      this.sidebarWidth = 60;
    }
    this.setupWizardService.setSidebarWidth(this.sidebarWidth);
    this.setContentWidth();
  }

  toggleCollapseHelp(helpPanelOpen: boolean) {
    this.setupWizardService.helpPanelOpen.next(helpPanelOpen);
    if (helpPanelOpen) {
      this.helpWidth = 200;
    } else {
      this.helpWidth = 60;
    }
    this.setupWizardService.setHelpWidth(this.helpWidth);
    this.setContentWidth();
  }

  setContentWidth() {
    let contentWidth: number = (window.innerWidth - this.helpWidth - this.sidebarWidth);
    if (contentWidth < 600) {
      this.contentWidth = 600;
    } else {
      this.contentWidth = contentWidth;
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.setContentWidth();
  }

  toggleCollapseSidebarCanvas(sidebarOpen?: boolean) {
    this.sidebarCanvasOpen = !this.sidebarCanvasOpen;
  }

  toggleCollapseHelpPanelCanvas(helpPanelOpen?: boolean) {
    this.helpPanelCanvasOpen = !this.helpPanelCanvasOpen;
  }
}
