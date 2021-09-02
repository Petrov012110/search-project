import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ITable } from "../../environments/interface";


@Injectable()
export class ManagerService {

    public onSearchEvent: Subject<string> = new Subject<string>();
    public onServerAnswerEvent: Subject<ITable[]> = new Subject<ITable[]>();
    public onCheckboxEvent: Subject<string[]> = new Subject<string[]>();
}