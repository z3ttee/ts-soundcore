import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { Page } from "../../pagination/page";
import { Pageable } from "../../pagination/pageable";
import { SCDKOptions, SCDK_OPTIONS } from "../../scdk.module";
import { Notification } from "../entities/notification.entity";
import { SCDKNotificationGateway } from "../gateway/notification.gateway";

@Injectable()
export class SCDKNotificationService {

    private _notificationSubject: BehaviorSubject<Set<Notification>> = new BehaviorSubject(new Set([]));
    public $notifications: Observable<Notification[]> = this._notificationSubject.asObservable().pipe(
        map((set) => Array.from(set)), 
        map((list) => list.sort((a, b) => {
            return new Date(b?.sentAt).getTime() - new Date(a?.sentAt)?.getTime()
        }))
    );

    constructor(
        private readonly httpClient: HttpClient,
        private readonly gateway: SCDKNotificationGateway,
        @Inject(SCDK_OPTIONS) private readonly options: SCDKOptions
    ) {
        this.gateway.$onNotificationReceived.subscribe((notification) => this.addNotifications([ notification ]));
    }

    public findByCurrentUser(pageable: Pageable): Observable<Page<Notification>> {
        return this.httpClient.get<Page<Notification>>(`${this.options.api_base_uri}/v1/notifications/@me${Pageable.toQuery(pageable)}`).pipe(tap((page) => {
            this.addNotifications(page.elements);
        }))
    }

    private addNotifications(notifications: Notification[]) {
        const cached = this._notificationSubject.getValue();
        for(const element of notifications) {
            cached.add(element);
        }
        this._notificationSubject.next(cached)
    }


    public test() {
        this.httpClient.post(`${this.options.api_base_uri}/v1/notifications/test`, {}).subscribe()
    }


}