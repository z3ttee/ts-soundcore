import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MountInfoComponent } from './views/mount-info/mount-info.component';
import { SCDKMountModule } from 'soundcore-sdk';
import { SCNGXButtonModule, SCNGXBytesPipeModule, SCNGXInfiniteListModule, SCNGXSkeletonModule } from 'soundcore-ngx';
import { chartPie, collection, HeroIconModule, pencil, plus, refresh, star, trash } from 'ng-heroicon';
import { Error404Module } from 'src/app/shared/error404/error404.module';
import { FileListItemModule } from 'src/app/components/list-items/file-list-item/file-list-item.module';

const routes: Routes = [
  { path: "", component: MountInfoComponent },
]

@NgModule({
  declarations: [
    MountInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeroIconModule.withIcons({ collection, chartPie, plus, refresh, star, trash, pencil }),
    Error404Module,
    FileListItemModule,

    SCDKMountModule,

    SCNGXButtonModule,
    SCNGXSkeletonModule,
    SCNGXInfiniteListModule,
    SCNGXBytesPipeModule
  ]
})
export class MountsModule { }
