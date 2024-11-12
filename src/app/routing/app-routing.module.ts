import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from '../core-components/welcome/welcome.component';
import { PageNotFoundComponent } from '../core-components/page-not-found/page-not-found.component';
import { SetupWizardRoutes } from './setup-wizard.routes';
import { PortfolioRoutes } from './portfolio.routes';
import { NebsDatabaseComponent } from '../nebs-database/nebs-database.component';

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
    path: 'nebs-database',
    component: NebsDatabaseComponent
  },
  SetupWizardRoutes,
  PortfolioRoutes,
  //wildcard/page not found needs to be last route
  //triggered after entire route tree is checked
  { path: "**", component: PageNotFoundComponent },

];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  useHash: true,
  enableViewTransitions: true
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
