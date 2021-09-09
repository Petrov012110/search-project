import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { ITable } from "../../environments/interface";
import { ControlsViewModel } from "../models/controls.view-model";
import { HistoryItemViewModel } from "../models/history-item.model";


@Injectable()
export class ManagerService {

    public onSearchEvent: Subject<string> = new Subject<string>();
    public onServerAnswerEvent: Subject<ITable[]> = new Subject<ITable[]>();
    public onCheckboxEvent: Subject<FormGroup> = new Subject<FormGroup>();
    public onHistoryEvent: Subject<HistoryItemViewModel> = new Subject<HistoryItemViewModel>();
    public onCounterEvent: Subject<number> = new Subject<number>();
    public onHistoryControlsEvent: Subject<ControlsViewModel> = new Subject<ControlsViewModel>();
    
}