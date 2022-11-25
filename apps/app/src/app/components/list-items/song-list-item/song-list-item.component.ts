import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { Song, User } from '@soundcore/sdk';

@Component({
  selector: 'scngx-song-list-item',
  templateUrl: './song-list-item.component.html',
  styleUrls: ['./song-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SCNGXSongListItemComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor() { }

  @Input() 
  public song: Song;

  @Input() 
  public index: number;

  @Input()
  public addedAt: number;

  @Input()
  public addedBy: User;

  @Input() 
  public active: boolean = false;

  @Input() 
  public playing: boolean = false;

  @Input()
  public showCover: boolean = true;
  @Input()
  public showId: boolean = true;
  @Input()
  public showAlbum: boolean = true;

  @Input()
  public animRef: TemplateRef<any>;

  @Input()
  public isMobile: boolean = false;

  @Output() public onContext: EventEmitter<Song> = new EventEmitter();
  @Output() public onPlay: EventEmitter<Song> = new EventEmitter();
  @Output() public onLike: EventEmitter<Song> = new EventEmitter();

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    
  }

  public ngOnDestroy(): void {
      this.onContext.complete();
      this.onPlay.complete();
      this.onPlay.complete();
  }

  public emitOnContext(event: MouseEvent) {
    if(this.onContext.observed) {
      this.cancelEvent(event);
    }

    this.onContext.emit(this.song);
  }

  public emitOnPlay(event: MouseEvent) {
    if(this.onPlay.observed) {
      this.cancelEvent(event);
    }

    this.onPlay.emit(this.song);
  }

  public emitOnPlayMobile(event: MouseEvent) {
    if(!this.isMobile) return;
    
    if(this.onPlay.observed) {
      this.cancelEvent(event);
    }

    this.onPlay.emit(this.song);
  }

  public emitOnLike(event: MouseEvent) {
    if(this.onLike.observed) {
      this.cancelEvent(event);
    }
    
    this.onLike.emit(this.song);
  }

  private cancelEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

}