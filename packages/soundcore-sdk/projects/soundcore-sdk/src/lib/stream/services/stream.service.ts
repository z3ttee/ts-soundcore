import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
<<<<<<< HEAD
import { SCSDKOptions, SCSDK_OPTIONS } from '../../scdk.module';
=======
import { SCSDKOptions } from '../../scdk.module';
>>>>>>> main
import { SCSDKStreamToken } from '../entities/token.entity';
import { HttpClient } from '@angular/common/http';
import { apiResponse } from '../../utils/rxjs/operators/api-response';
import { ApiResponse } from '../../utils/responses/api-response';
import { SCSDK_OPTIONS } from '../../constants';

@Injectable({
    providedIn: "root"
})
export class SCSDKStreamService {

    constructor(
        private readonly httpClient: HttpClient,
        @Inject(SCSDK_OPTIONS) private readonly options: SCSDKOptions
    ){}

    public requestStreamUrl(songId: string): Observable<string> {
        return this.requestToken(songId).pipe(map((response) => {
            if(response.error) {
                throw new Error(response.message);
            }

            const token = response.payload?.token;
            return `${this.options.api_base_uri}/v1/streams/stream?token=${token}`;
        }));
    }

    public requestToken(songId: string): Observable<ApiResponse<SCSDKStreamToken>> {
        return this.httpClient.get<SCSDKStreamToken>(`${this.options.api_base_uri}/v1/streams/token/${songId}`).pipe(apiResponse());
    }

}
