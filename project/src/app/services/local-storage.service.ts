import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ControlsViewModel } from "../models/controls.view-model";
import { HistoryItemViewModel } from "../models/history-item.model";

@Injectable()
export class LocalStorageService {

    public controls!: ControlsViewModel;

    public setHistoryToLocalStorage(searchParam: string, controls: ControlsViewModel): void {

        const maxHistoryLength = 15;
        const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        const isHistoryMaxed = history.length === maxHistoryLength;
        const workingHistory = isHistoryMaxed ? history.slice(1) : history;
        const updatedHistory = workingHistory.concat(new HistoryItemViewModel(searchParam, controls));

        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }

    public getHistoryFromLocalStorage(): Observable<HistoryItemViewModel[]> {
        return of(JSON.parse(localStorage.getItem('searchHistory') || '[]'));
    }

    public getHistoryControls(objectHistoryItem: HistoryItemViewModel): ControlsViewModel {

        let arrayOfControlsFromHistory: Array<HistoryItemViewModel> = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        
        arrayOfControlsFromHistory.forEach(item => {
            if (item.input === objectHistoryItem.input  && item.controls && item.date == objectHistoryItem.date) {
               
                this.controls = item.controls;
                
            } 
        });

        return this.controls;

    }


}