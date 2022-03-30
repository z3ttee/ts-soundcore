import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { Song } from 'src/app/features/song/entities/song.entity';
import { AudioService } from 'src/app/features/stream/services/audio.service';
import { ListCreator } from 'src/lib/data/list-creator';
import { PlayableList } from 'src/lib/data/playable-list.entity';
import { Album } from '../../entities/album.entity';
import { AlbumService } from '../../services/album.service';

@Component({
  templateUrl: './album-info.component.html',
  styleUrls: ['./album-info.component.scss']
})
export class AlbumInfoComponent implements OnInit, OnDestroy {

  private _destroySubject: Subject<void> = new Subject();
  private $destroy: Observable<void> = this._destroySubject.asObservable();

  // Main data objects
  private _songsSubject: BehaviorSubject<Song[]> = new BehaviorSubject([]);
  private _albumSubject: BehaviorSubject<Album> = new BehaviorSubject(null);
  private _loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public $songs: Observable<Song[]> = this._songsSubject.asObservable();
  public $album: Observable<Album> = this._albumSubject.asObservable();
  public $isLoading: Observable<boolean> = this._loadingSubject.asObservable();
  public $isPaused: Observable<boolean> = combineLatest([ this.audioService.$paused, this.audioService.$currentItem ]).pipe(takeUntil(this.$destroy), map(([paused, item]) => paused || item?.context?.id != this.list?.id))

  public recommendedAlbums: Album[] = [];
  public list: PlayableList<Album>;

  // Accent colors  
  public accentColor: string = "#FFBF50";

  constructor(
    private activatedRoute: ActivatedRoute,
    private albumService: AlbumService,
    private router: Router,
    private listCreator: ListCreator,
    private audioService: AudioService
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(takeUntil(this.$destroy)).subscribe((paramMap) => {
      const id = paramMap.get("albumId");
      this.setAlbum(null);
      
      this.findAlbum(id).then((album) => this.setAlbum(album));
      // TODO: Implement error message
    })
  }

  public ngOnDestroy(): void {
      this._destroySubject.next();
      this._destroySubject.complete();
  }

  private async findAlbum(id: string) {
    this._loadingSubject.next(true)
    return this.albumService.findById(id).finally(() => this._loadingSubject.next(false))
  }

  public async setAlbum(album: Album) {
    this._albumSubject.next(album);

    if(!album) this.list = null;
    else this.list = this.listCreator.forAlbum(album);

    this.albumService.findRecommendedByArtist(album?.artist?.id, [ album?.id ]).then((page) => {
      this.recommendedAlbums = page.elements;
    })
  }

  public async showDiscography() {
    const album = this._albumSubject.getValue();
    if(!album?.artist) return;
    this.router.navigate(["/artist", album.artist?.id, "discography"])
  }

  public async playOrPauseList() {
    this.audioService.playOrPauseList(this.list)
  }

}
