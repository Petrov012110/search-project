import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TResourseData } from "src/environments/interface";


@Injectable()
export class ManagerService {

    public onSearchEvent: Subject<string> = new Subject<string>();
    public onServerAnswerEvent: Subject<TResourseData> = new Subject<TResourseData>();
}