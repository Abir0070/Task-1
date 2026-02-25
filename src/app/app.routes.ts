import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', loadChildren: () => import('./compose-message/compose-message.module').then(m => m.ComposeMessageModule) }
];
