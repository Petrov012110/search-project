
import { Component, OnInit } from '@angular/core';
import { delay, tap } from 'rxjs/operators';
import { GlobalErrorHandlerService } from '../../../app/services/global-error-handler.service';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./style/error.component.scss']
})
export class ErrorComponent implements OnInit {

    public errorMessage: string | null = '';

    constructor(private _handleErrorService: GlobalErrorHandlerService) {

    }

    public ngOnInit(): void {
        this._handleErrorService.onErrorEvent
            .pipe(
                tap(error => {
                    if (error) {
                        this.errorMessage = error;
                    } else {
                        this.errorMessage = null;
                    }
                }),
                delay(5000)
            )
            .subscribe(error => {
                this.errorMessage = null;
            });
    }

    public closeError(): void {
        this.errorMessage = null
    }








}
