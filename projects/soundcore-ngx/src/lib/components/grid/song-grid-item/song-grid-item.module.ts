import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SCDKSongGridItemComponent } from './song-grid-item.component';
import { SCNGXResourceGridItemModule } from '../resource-grid-item/resource-grid-item.module';
import { SCNGXArtworkModule } from '../../images/artwork/artwork.module';

@NgModule({
  declarations: [
    SCDKSongGridItemComponent
  ],
  imports: [
    CommonModule,
    SCNGXResourceGridItemModule,
    SCNGXArtworkModule
  ],
  exports: [
    SCDKSongGridItemComponent
  ]
})
export class SCNGXSongGridItemModule { }
