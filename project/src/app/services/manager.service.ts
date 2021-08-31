import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable()
export class ManagerService {

    public onSearchEvent: Subject<any> = new Subject<any>();
}