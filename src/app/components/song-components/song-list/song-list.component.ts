import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { take, zip } from 'rxjs';
import { Song } from 'src/app/features/song/entities/song.entity';
import { AudioService } from 'src/app/features/stream/services/audio.service';
import { LikeService } from 'src/app/services/like.service';
import audio_wave_anim from "src/assets/animated/audio_wave.json"

@Component({
  selector: 'asc-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

    @Input() public dataSource: Song[] = [];

    @Input() public showHead: boolean = true;
    @Input() public showAlbum: boolean = true;
    @Input() public showCover: boolean = true;
    @Input() public showDate: boolean = true;
    @Input() public showCount: boolean = true;
    @Input() public showMore: boolean = true;

    @Output() public onMore: EventEmitter<void> = new EventEmitter();

    public animOptions: AnimationOptions = {
        autoplay: true,
        loop: true,
        animationData: audio_wave_anim
    }

    constructor(
        public audioService: AudioService,
        private likeService: LikeService
    ) { }

    ngOnInit(): void {
    }

    public async playOrPause(song: Song) {
        zip([
            this.audioService.$currentSong,
            this.audioService.$paused
        ]).pipe(take(1)).subscribe((state) => {
            const isActive = state[0]?.id == song.id;
            const isPlayerPaused = state[1];

            if(!isActive) {
                this.audioService.play(song)
                return;
            }

            if(!isPlayerPaused) {
                this.audioService.pause();
                return
            } else {
                this.audioService.play();
            }
        })
    }

    public async likeSong(song: Song) {
        this.likeService.likeSong(song?.id).then(() => {
            const index = this.dataSource.findIndex((s) => s.id == song?.id);
            if(index == -1) return;

            this.dataSource[index].isLiked = !this.dataSource[index].isLiked;
        });
    }

}
