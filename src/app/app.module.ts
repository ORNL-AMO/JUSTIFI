import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core-components/navbar/navbar.component';
import { WelcomeComponent } from './core-components/welcome/welcome.component';
import { PageNotFoundComponent } from './core-components/page-not-found/page-not-found.component';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';
import { CompanyDashboardModule } from './company-dashboard/company-dashboard.module';
import { FacilityDashboardModule } from './facility-dashboard/facility-dashboard.module';
import { IndexedDbModule } from './indexed-db/indexed-db.module';
import { LoadingComponent } from './core-components/loading/loading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { SetupWizardModule } from './setup-wizard/setup-wizard.module';
import { SidebarComponent } from './core-components/sidebar/sidebar.component';
import { HelperPipesModule } from './shared/helper-pipes/helper-pipes.module';
import { AssessmentDashboardModule } from './assessment-dashboard/assessment-dashboard.module';
import { SetupWizardModalComponent } from './core-components/setup-wizard-modal/setup-wizard-modal.component';
import { ImportBackupModalComponent } from './core-components/import-backup-modal/import-backup-modal.component';
import { PlotlyViaWindowModule } from 'angular-plotly.js';
import { ToastNotificationsComponent } from './core-components/toast-notifications/toast-notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    LoadingComponent,
    SidebarComponent,
    SetupWizardModalComponent,
    ImportBackupModalComponent,
    ToastNotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserDashboardModule,
    CompanyDashboardModule,
    FacilityDashboardModule,
    IndexedDbModule,
    FontAwesomeModule,
    FormsModule,
    SetupWizardModule,
    HelperPipesModule,
    AssessmentDashboardModule,
    PlotlyViaWindowModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
