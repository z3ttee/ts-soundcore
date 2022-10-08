import { QueueEvent, QueueEventName } from "../../queue/events/events";
import { BaseQueue } from "../../shared/queue-interface";
import { Worker } from "./worker.entity";

type WorkerStartedEvent<T> = (worker: Worker<T>) => Promise<void> | void;
type WorkerCompletedEvent<T, R = any> = (worker: Worker<T>, result: R) => Promise<void> | void;
type WorkerFailedEvent<T, E = Error> = (worker: Worker<T>, error: E) => Promise<void> | void;
type WorkerProgressEvent<T> = (worker: Worker<T>, progress: number) => Promise<void> | void;

export type WorkerEventName = QueueEventName | "started" | "completed" | "failed" | "progress";
export type WorkerEvent<T, EN = WorkerEventName, R = any, E = Error> = 
    EN extends QueueEventName ? QueueEvent<QueueEventName> :
    EN extends "started" ? WorkerStartedEvent<T> :
    EN extends "completed" ? WorkerCompletedEvent<T, R> :
    EN extends "failed" ? WorkerFailedEvent<T, E> :
    EN extends "progress" ? WorkerProgressEvent<T> : Promise<never> | never;

export class WorkerQueue extends BaseQueue<Worker, WorkerEventName, WorkerEvent<Worker, WorkerEventName>> {

    constructor(debounceMs: number = 0) {
        super(debounceMs);
    }


}