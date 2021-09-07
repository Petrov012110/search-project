
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { HandleError } from 'src/app/services/handleError.service';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

    public errorMessage: string | null = null;
   

 

    constructor(private _handleErrorService: HandleError) {

    }

    public ngOnInit(): void {
        this._handleErrorService.onErrorEvent
            .subscribe(error => {
                if(error) {
                    this.errorMessage = error.message;
                } else {
                    this.errorMessage = null;
                    
                }
            })
    }

    public closeError(): void {
        this.errorMessage = null
    }








}
