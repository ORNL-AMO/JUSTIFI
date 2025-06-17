import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core-components/navbar/navbar.component';
import { WelcomeComponent } from './core-components/welcome/welcome.component';
import { PageNotFoundComponent } from './core-components/page-not-found/page-not-found.component';
import { IndexedDbModule } from './indexed-db/indexed-db.module';
import { LoadingComponent } from './core-components/loading/loading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { SetupWizardModule } from './setup-wizard/setup-wizard.module';
import { SidebarComponent } from './core-components/sidebar/sidebar.component';
import { HelperPipesModule } from './shared/helper-pipes/_helper-pipes.module';
import { SetupWizardModalComponent } from './core-components/setup-wizard-modal/setup-wizard-modal.component';
import { ImportBackupModalComponent } from './core-components/backup-modal/import-backup-modal/import-backup-modal.component';
import { UserPortfolioModule } from './user-portfolio/user-portfolio.module';
import { PlotlyViaWindowModule } from 'angular-plotly.js';
import { FeedbackPageComponent } from './core-components/feedback-page/feedback-page.component';
import { AcknowledgmentsComponent } from './core-components/acknowledgments/acknowledgments.component';
import { AboutComponent } from './core-components/about/about.component';
import { HelpComponent } from './core-components/help/help.component';
import { AlphaDisclaimerComponent } from './core-components/alpha-disclaimer/alpha-disclaimer.component';
import { ToastNotificationsComponent } from './core-components/toast-notifications/toast-notifications.component';
import { NebsDatabaseModule } from './nebs-database/nebs-database.module';
import { localeCurrency } from './shared/constants/localeCurrency';
import { ExportBackupModalComponent } from './core-components/backup-modal/export-backup-modal/export-backup-modal.component';
import { ExportBackupTreeComponent } from './core-components/backup-modal/export-backup-modal/export-backup-tree/export-backup-tree.component';
import { WelcomeSlideshowComponent } from './core-components/welcome-slideshow/welcome-slideshow.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { PerformanceMetricsTablePipe } from './shared/reports/performance-metrics-table/performance-metrics-table.pipe';

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
    FeedbackPageComponent,
    AcknowledgmentsComponent,
    AboutComponent,
    HelpComponent,
    AlphaDisclaimerComponent,
    ToastNotificationsComponent,
    ExportBackupModalComponent,
    ExportBackupTreeComponent,
    WelcomeSlideshowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IndexedDbModule,
    FontAwesomeModule,
    FormsModule,
    SetupWizardModule,
    HelperPipesModule,
    UserPortfolioModule,
    PlotlyViaWindowModule,
    PlotlyViaWindowModule,
    NebsDatabaseModule
  ],
  providers: [
    { 
      // Set the initial currency code based on browser language
      provide: DEFAULT_CURRENCY_CODE,
      useFactory: () => {
        const browserLang = navigator.language;
        const currencyOption = localeCurrency.find(option => 
          option.locale === browserLang
        );
        return currencyOption ? currencyOption.currencyCode : 'USD';
      },
    },
    [DatePipe, PerformanceMetricsTablePipe, CurrencyPipe]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
