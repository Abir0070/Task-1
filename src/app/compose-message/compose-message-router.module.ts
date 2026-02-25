import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { COMPOSE_MESSAGE_ROUTES } from './compose-message.routes';

/** Router configuration for the compose-message feature. Exported so NgModule imports resolve statically. */
export const ComposeMessageRouterModule: ModuleWithProviders<RouterModule> =
  RouterModule.forChild(COMPOSE_MESSAGE_ROUTES);
