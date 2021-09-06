import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ITable } from "../../environments/interface";
import { CheckboxModel } from "../components/filter/models/checkbox.model";


@Injectable()
export class ManagerService {

    public onSearchEvent: Subject<string> = new Subject<string>();
    public onServerAnswerEvent: Subject<ITable[]> = new Subject<ITable[]>();
    public onCheckboxEvent: Subject<CheckboxModel[]> = new Subject<CheckboxModel[]>();
    public onHistoryEvent: Subject<string> = new Subject<string>();
    public onCounterEvent: Subject<number> = new Subject<number>();
    
}