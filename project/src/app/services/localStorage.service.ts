import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable()
export class LocalStorageService {

    public setHistoryToLocalStorage(searchParam: string): void {
        const maxHistoryLength = 15;
        const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        const isHistoryMaxed = history.length === maxHistoryLength;
        const workingHistory = isHistoryMaxed ? history.slice(1) : history;
        const updatedHistory = workingHistory.concat(this.cutInputValue(searchParam));

        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }

    public getHistoryFromLocalStorage(): Observable<string[]> {
        return of(JSON.parse(localStorage.getItem('searchHistory') || '[]'));
    }

    public cutInputValue(item: string): string {
        if(item.length > 11) {
          return `${item.substring(0, 11)}...`;
        } else {
          return item;
        }
      }

}