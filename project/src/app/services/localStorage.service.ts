import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable()
export class LocalStorageService {

    public setHistoryToLocalStorage(searchParam: string): void {
        const maxHistoryLength = 15;
        const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        const isHistoryMaxed = history.length === maxHistoryLength;
        const workingHistory = isHistoryMaxed ? history.slice(1) : history;
        const updatedHistory = workingHistory.concat(searchParam);

        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }

    public getHistoryFromLocalStorage() {
        return of(JSON.parse(localStorage.getItem('searchHistory') || '[]'));
    }

}