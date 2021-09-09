import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

    public onErrorEvent: Subject<string> = new Subject<string>();

    constructor(private _ngZone: NgZone) {

    }

    public handleError(error: any): void {
        this._ngZone.run(() => {
            if (error instanceof HttpErrorResponse) {

                console.error('Backend returned status code: ', error.status);
                console.error('Response body:', error.message);


            } else {

                console.error('An error occurred:', error.message);

            }

            this.onErrorEvent.next(error.message);
        });

    }
}