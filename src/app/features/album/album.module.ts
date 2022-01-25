import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AlbumService } from './services/album.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AlbumInfoComponent } from './views/album-info/album-info.component';
import { AppCommonModule } from 'src/app/common.module';
import { AscSongModule } from 'src/app/components/song-components/song-components.module';
import { AscImageModule } from 'src/app/components/image-components/image-components.module';
import { AscBadgeModule } from 'src/app/components/badge-components/badge-components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MatTooltipModule } from '@angular/material/tooltip';

const routes: Routes = [
  { path: ":albumId", component: AlbumInfoComponent }
]

@NgModule({
  declarations: [
    AlbumInfoComponent
  ],
  providers: [
    AlbumService
  ],
  imports: [
    AppCommonModule,
    CommonModule,
    RouterModule.forChild(routes),

    PipesModule,
    AscSongModule,
    AscBadgeModule,
    AscImageModule,

    MatProgressBarModule,
    MatTooltipModule
  ]
})
export class AlbumModule { }