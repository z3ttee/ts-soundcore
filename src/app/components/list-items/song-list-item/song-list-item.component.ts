import { Overlay } from '@angular/cdk/overlay';
import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, map } from 'rxjs';
import { ChoosePlaylistComponent } from 'src/app/features/playlist/dialogs/choose-playlist/choose-playlist.component';
import { Playlist } from 'src/app/features/playlist/entities/playlist.entity';
import { PlaylistService } from 'src/app/features/playlist/services/playlist.service';
import { Song } from 'src/app/features/song/entities/song.entity';
import { StreamService } from 'src/app/features/stream/services/stream.service';
import { ContextMenuService } from 'src/app/services/context-menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'asc-song-list-item',
  templateUrl: './song-list-item.component.html',
  styleUrls: ['./song-list-item.component.scss']
})
export class SongListItemComponent implements OnInit {

  @ViewChild('songMenu') songMenu: TemplateRef<any>;

    @Input() public song: Song;
    public playable: boolean = true;

    public coverSrc: string = null;
    public accentColor: string = "";

    public isPlaying: boolean = false;
    public isActive: boolean = false;
    public isPlayerPaused: boolean = true;
    
    constructor(
        private streamService: StreamService,
        public overlay: Overlay,
        public viewContainerRef: ViewContainerRef,
        private contextMenuService: ContextMenuService,
        private dialog: MatDialog,
        private playlistService: PlaylistService
    ) {
        combineLatest([
            this.streamService.$currentSong,
            this.streamService.$player
        ]).pipe(map(([song, status]) => ({ song, status }))).subscribe((state) => {
            this.isActive = state.song && state.song?.id == this.song?.id && !state.status.paused;
            this.isPlaying = state.song && state.song?.id == this.song?.id;
            this.isPlayerPaused = state.status.paused
        })
    }

    public async ngOnInit() {
        if(this.song.artwork) {
            this.coverSrc = `${environment.api_base_uri}/v1/artworks/${this.song.artwork.id}`;
            this.accentColor = this.song.artwork.accentColor || "#000000";
        } else {
            this.coverSrc = "/assets/img/missing_cover.png"
        }
    }

    public async playOrPause() {
        if(!this.playable) return;

        this.contextMenuService.close();

        if(this.isPlaying) {
            if(this.streamService.isPaused()) {
                this.streamService.play();
            } else {
                this.streamService.pause();
            }
        } else {
            this.streamService.playSong(this.song);
        }
        
    }

    public async openSongMenu(event: MouseEvent, song: Song) {
        this.contextMenuService.open(event, this.songMenu, this.viewContainerRef, {
            $implicit: song
        });
    }

    public async openChoosePlaylist() {
        const ref = this.dialog.open(ChoosePlaylistComponent)

        ref.afterClosed().subscribe((playlist: Playlist) => {
            if(!playlist) return;
            this.playlistService.updateSongs(playlist.id, {
                action: "add",
                songs: [ this.song ]
            })
        })
    }

}