import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'compose', pathMatch: 'full' },
  {
    path: 'compose',
    loadComponent: () =>
      import('./compose-message/compose-message.component').then(
        (m) => m.ComposeMessageComponent
      ),
  },
  { path: '**', redirectTo: 'compose' },
];
