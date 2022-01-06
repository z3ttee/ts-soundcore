import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Song } from 'src/app/model/song.model';
import { Page, Pageable } from 'src/app/pagination/pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(
    private httpClient: HttpClient
) {}

  public findLatestSongs(): Observable<Page<Song>> {
      return this.httpClient.get(`${environment.api_base_uri}/v1/songs/latest`) as Observable<Page<Song>>
  }

  public findOldestSongs(): Observable<Page<Song>> {
      return this.httpClient.get(`${environment.api_base_uri}/v1/songs/oldest`) as Observable<Page<Song>>
  }

  public async findMyUploadedSongs(pageable?: Pageable): Promise<Page<Song>> {
      return firstValueFrom(this.httpClient.get(`${environment.api_base_uri}/v1/songs/byUploader/@me${Pageable.toQuery(pageable)}`)).then((page) => page as Page<Song>)
  }
}