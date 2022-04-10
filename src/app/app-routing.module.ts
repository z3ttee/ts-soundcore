import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AscMainLayoutComponent } from 'src/layouts/main-layout/main-layout.component';
import { AscMainLayoutModule } from 'src/layouts/main-layout/main-layout.module';
import { KeycloakSSOGuard } from 'src/sso/guards/keycloak.guard';
import { Error404Component } from './shared/error404/error404.component';
import { Error404Module } from './shared/error404/error404.module';

const routes: Routes = [
  { path: "", component: AscMainLayoutComponent, canActivate: [KeycloakSSOGuard], children: [
    { path: "", canActivate: [KeycloakSSOGuard], loadChildren: () => import("./modules/home/home.module").then((m) => m.HomeModule) },
    { path: "playlist", canActivate: [KeycloakSSOGuard], loadChildren: () => import("./modules/playlist/playlist.module").then((m) => m.PlaylistModule) },
    { path: "library", canActivate: [KeycloakSSOGuard], loadChildren: () => import("./modules/library/library.module").then((m) => m.LibraryModule) },
    { path: "profile", canActivate: [KeycloakSSOGuard], loadChildren: () => import("./modules/settings/settings.module").then((m) => m.SettingsModule) },
    { path: "settings", canActivate: [KeycloakSSOGuard], loadChildren: () => import("./modules/settings/settings.module").then((m) => m.SettingsModule) },
    { path: "**", component: Error404Component }
  ]},
  { path: "**", redirectTo: "/" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AscMainLayoutModule,
    Error404Module
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
