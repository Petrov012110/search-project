import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { ITable } from "../../environments/interface";
import { CheckboxModel } from "../components/filter/models/checkbox.model";
import { HistoryItemViewModel } from "../models/historyItem.model";


@Injectable()
export class ManagerService {

    public onSearchEvent: Subject<string> = new Subject<string>();
    public onServerAnswerEvent: Subject<ITable[]> = new Subject<ITable[]>();
    public onCheckboxEvent: Subject<FormGroup> = new Subject<FormGroup>();
    public onHistoryEvent: Subject<HistoryItemViewModel> = new Subject<HistoryItemViewModel>();
    public onCounterEvent: Subject<number> = new Subject<number>();
    
}