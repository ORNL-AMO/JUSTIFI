import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from '../core-components/welcome/welcome.component';
import { PageNotFoundComponent } from '../core-components/page-not-found/page-not-found.component';
import { SetupWizardRoutes } from './setup-wizard.routes';
import { PortfolioRoutes } from './portfolio.routes';
import { NebsDatabaseComponent } from '../nebs-database/nebs-database.component';
import { AboutComponent } from '../core-components/about/about.component';
import { FeedbackPageComponent } from '../core-components/feedback-page/feedback-page.component';
import { AcknowledgmentsComponent } from '../core-components/acknowledgments/acknowledgments.component';
import {
  ABOUT_SEO_ROUTE_DATA,
  ACKNOWLEDGMENTS_SEO_ROUTE_DATA,
  DEFAULT_SEO_ROUTE_DATA,
  FEEDBACK_SEO_ROUTE_DATA,
  NEBS_DATABASE_SEO_ROUTE_DATA,
  PAGE_NOT_FOUND_SEO_ROUTE_DATA
} from '../shared/constants/seoRouteData';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent,
    title: DEFAULT_SEO_ROUTE_DATA.title,
    data: {
      seo: DEFAULT_SEO_ROUTE_DATA
    }
  },
  {
    path: 'welcome',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'nebs-database',
    component: NebsDatabaseComponent,
    title: NEBS_DATABASE_SEO_ROUTE_DATA.title,
    data: {
      seo: NEBS_DATABASE_SEO_ROUTE_DATA
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    title: ABOUT_SEO_ROUTE_DATA.title,
    data: {
      seo: ABOUT_SEO_ROUTE_DATA
    }
  },
  {
    path: 'feedback',
    component: FeedbackPageComponent,
    title: FEEDBACK_SEO_ROUTE_DATA.title,
    data: {
      seo: FEEDBACK_SEO_ROUTE_DATA
    }
  },
  {
    path: 'acknowledgments',
    component: AcknowledgmentsComponent,
    title: ACKNOWLEDGMENTS_SEO_ROUTE_DATA.title,
    data: {
      seo: ACKNOWLEDGMENTS_SEO_ROUTE_DATA
    }
  },
  SetupWizardRoutes,
  PortfolioRoutes,
  //wildcard/page not found needs to be last route
  //triggered after entire route tree is checked
  {
    path: "**",
    component: PageNotFoundComponent,
    title: PAGE_NOT_FOUND_SEO_ROUTE_DATA.title,
    data: {
      seo: PAGE_NOT_FOUND_SEO_ROUTE_DATA
    }
  },

];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  useHash: window.location.protocol === 'file:',
  enableViewTransitions: true
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
