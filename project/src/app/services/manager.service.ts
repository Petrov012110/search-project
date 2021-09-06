import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { ITable } from "../../environments/interface";
import { CheckboxModel } from "../components/filter/models/checkbox.model";


@Injectable()
export class ManagerService {

    public onSearchEvent: Subject<string> = new Subject<string>();
    public onServerAnswerEvent: Subject<ITable[]> = new Subject<ITable[]>();
    public onCheckboxEvent: Subject<FormGroup> = new Subject<FormGroup>();
    public onHistoryEvent: Subject<string> = new Subject<string>();
    public onCounterEvent: Subject<number> = new Subject<number>();
    
}