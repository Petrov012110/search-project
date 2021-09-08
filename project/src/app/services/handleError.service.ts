// import { HttpErrorResponse } from "@angular/common/http";
// import { Injectable, OnInit } from "@angular/core";
// import { Subject } from "rxjs";
// import { ManagerService } from "./manager.service";

// @Injectable()
// export class HandleError implements OnInit {
//     public errorMessage!: string;
//     public onErrorEvent: Subject<HttpErrorResponse | null> = new Subject<HttpErrorResponse | null>();

//     constructor(private _managerService: ManagerService) {

//     }

//     public ngOnInit() {
//         // this._managerService.onErrorEvent
//         //     .subscribe(error => {
//         //         this.errorMessage = error.message;
//         //     })
//     }

//     public setError(error: HttpErrorResponse | null) {
//         // this.onErrorEvent.next(error);
//         // setTimeout(() => { 
//         //     this.onErrorEvent.next(null)
//         // }, 5000);
//     }

    
// }