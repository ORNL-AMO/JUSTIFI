import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './core-components/welcome/welcome.component';
import { PageNotFoundComponent } from './core-components/page-not-found/page-not-found.component';
import { SetupWizardComponent } from './setup-wizard/setup-wizard.component';
import { CompanySetupComponent } from './setup-wizard/pre-visit/company-setup/company-setup.component';
import { FacilitySetupComponent } from './setup-wizard/pre-visit/facility-setup/facility-setup.component';
import { CompanyContactsSetupComponent } from './setup-wizard/pre-visit/company-contacts-setup/company-contacts-setup.component';
import { FacilityProcessEquipmentSetupComponent } from './setup-wizard/pre-visit/facility-process-equipment-setup/facility-process-equipment-setup.component';
import { PreAssessmentSetupComponent } from './setup-wizard/pre-visit/pre-assessment-setup/pre-assessment-setup.component';
import { ReviewPreVisitSetupComponent } from './setup-wizard/pre-visit/review-pre-visit-setup/review-pre-visit-setup.component';
import { OnSiteAssessmentComponent } from './setup-wizard/data-collection/on-site-assessment/on-site-assessment.component';
import { ReviewOnSiteComponent } from './setup-wizard/data-collection/review-on-site/review-on-site.component';
import { PreVisitComponent } from './setup-wizard/pre-visit/pre-visit.component';
import { DataCollectionComponent } from './setup-wizard/data-collection/data-collection.component';
import { CompanyKpiSelectComponent } from './setup-wizard/pre-visit/company-kpi-select/company-kpi-select.component';
import { DataCollectionManageAssessmentsComponent } from './setup-wizard/data-collection/data-collection-manage-assessments/data-collection-manage-assessments.component';
import { CompanyKpiDetailsComponent } from './setup-wizard/pre-visit/company-kpi-details/company-kpi-details.component';
import { AssessmentDetailsFormComponent } from './setup-wizard/data-collection/on-site-assessment/assessment-details-form/assessment-details-form.component';
import { AssessmentEnergyOpportunitiesFormComponent } from './setup-wizard/data-collection/on-site-assessment/assessment-energy-opportunities-form/assessment-energy-opportunities-form.component';
import { AssessmentNebsFormComponent } from './setup-wizard/data-collection/on-site-assessment/assessment-nebs-form/assessment-nebs-form.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { DataEvaluationComponent } from './setup-wizard/data-evaluation/data-evaluation.component';
import { DataFollowUpComponent } from './setup-wizard/data-evaluation/data-follow-up/data-follow-up.component';
import { VisitReportComponent } from './setup-wizard/data-evaluation/visit-report/visit-report.component';
import { AssessmentEvaluationComponent } from './setup-wizard/data-evaluation/assessment-evaluation/assessment-evaluation.component';
import { OnSiteAssessmentResultsComponent } from './setup-wizard/data-collection/on-site-assessment/on-site-assessment-results/on-site-assessment-results.component';
import { FacilityEnergyEquipmentSetupComponent } from './setup-wizard/pre-visit/facility-energy-equipment-setup/facility-energy-equipment-setup.component';
import { UserPortfolioComponent } from './user-portfolio/user-portfolio.component';
import { UserPortfolioHomeComponent } from './user-portfolio/user-portfolio-home/user-portfolio-home.component';
import { CompanyDashboardComponent } from './user-portfolio/company-dashboard/company-dashboard.component';
import { FacilityDashboardComponent } from './user-portfolio/facility-dashboard/facility-dashboard.component';
import { AssessmentDashboardComponent } from './user-portfolio/assessment-dashboard/assessment-dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'welcome'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'setup-wizard',
    component: SetupWizardComponent,
    children: [
      {
        path: 'pre-visit/:id',
        component: PreVisitComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'company-setup'
          },
          {
            path: 'company-setup',
            component: CompanySetupComponent,
            canDeactivate: [CanDeactivateGuard]
          },
          {
            path: 'company-kpi-select',
            component: CompanyKpiSelectComponent
          },
          {
            path: 'company-kpi-detail/:id',
            component: CompanyKpiDetailsComponent
          },
          {
            path: 'company-contacts',
            component: CompanyContactsSetupComponent,
            canDeactivate: [CanDeactivateGuard]
          },
          {
            path: 'facility-setup',
            component: FacilitySetupComponent,
            canDeactivate: [CanDeactivateGuard]
          },
          {
            path: 'energy-equipment',
            component: FacilityEnergyEquipmentSetupComponent
          },
          {
            path: 'end-uses',
            component: FacilityProcessEquipmentSetupComponent
          },
          {
            path: 'pre-assessment',
            component: PreAssessmentSetupComponent
          },
          {
            path: 'review-pre-visit',
            component: ReviewPreVisitSetupComponent
          }
        ]
      },
      {
        path: 'data-collection/:id',
        component: DataCollectionComponent,
        children: [
          {
            path: 'manage-assessments',
            component: DataCollectionManageAssessmentsComponent
          },
          {
            path: 'assessment/:id',
            component: OnSiteAssessmentComponent,
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'details'
              },
              {
                path: 'details',
                component: AssessmentDetailsFormComponent
              },
              {
                path: 'energy-opportunities',
                component: AssessmentEnergyOpportunitiesFormComponent
              },
              {
                path: 'nebs',
                component: AssessmentNebsFormComponent
              },
              {
                path: 'results',
                component: OnSiteAssessmentResultsComponent
              }
            ]
          },
          {
            path: 'review-data-collection',
            component: ReviewOnSiteComponent
          },
        ]
      },
      {
        path: 'data-evaluation/:id',
        component: DataEvaluationComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'follow-up'
          },
          {
            path: 'follow-up',
            component: DataFollowUpComponent
          },
          {
            path: 'assessment-report/:id',
            component: AssessmentEvaluationComponent,
          },
          {
            path: 'visit-report',
            component: VisitReportComponent,
          }
        ]
      }
    ]
  },
  {
    path: 'portfolio',
    component: UserPortfolioComponent,
    children: [
      {
        path: '',
        component: UserPortfolioHomeComponent
      },
      {
        path: 'company/:id',
        component: CompanyDashboardComponent
      },
      {
        path: 'facility/:id',
        component: FacilityDashboardComponent
      },
      {
        path: 'assessment/:id',
        component: AssessmentDashboardComponent
      }
    ]
  },
  //wildcard/page not found needs to be last route
  //triggered after entire route tree is checked
  { path: "**", component: PageNotFoundComponent },

];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  useHash: true
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
