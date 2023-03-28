import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { isNull } from "@soundcore/common";
import { Observable } from "rxjs";
import { SCSDK_OPTIONS } from "../../constants";
import { SCSDKOptions } from "../../scdk.module";
import { Future, toFuture } from "../../utils/future";
import { TracklistV2 } from "../entities/tracklist-v2.entity";

@Injectable()
export class SCSDKTracklistV2Service {

    constructor(
        private readonly httpClient: HttpClient,
        @Inject(SCSDK_OPTIONS) private readonly options: SCSDKOptions
    ) {}

    public getHttpClient(): HttpClient {
        return this.httpClient;
    }

    /**
     * Find tracklist entity by an album
     * @param albumId Album's id
     * @returns Tracklist
     */
    public findByAlbum(albumId: string, shuffled: boolean = false): Observable<Future<TracklistV2>> {
        return this.httpClient.get<TracklistV2>(`${this.options.api_base_uri}/v2/tracklists/album/${albumId}?shuffled=${encodeURIComponent(shuffled)}`).pipe(toFuture());
    }

}
