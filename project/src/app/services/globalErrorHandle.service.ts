import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
    public onErrorEvent: BehaviorSubject<string> = new BehaviorSubject<string>('');
    // public errormessage!: BehaviorSubject<string>;
    constructor() { }    

    public handleError(error: any): void {
       
      if (error instanceof HttpErrorResponse) {
          //Backend returns unsuccessful response codes such as 404, 500 etc.				  
          console.error('Backend returned status code: ', error.status);
          console.error('Response body:', error.message);
        //   this.errormessage = error.message;
        this.onErrorEvent.next(error.message)

          
          
        } else {
            //A client-side or network error occurred.	          
            console.error('An error occurred:', error.message);  
            // this.errormessage = error.message;
          this.onErrorEvent.next(error.message)

        }     

        
        // this.onErrorEvent.next(this.errormessage);
    }
} 