import { Component, OnInit } from '@angular/core';
import { HistoryItemViewModel } from 'src/app/models/history-item.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ManagerService } from 'src/app/services/manager.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./style/history.component.scss']
})
export class HistoryComponent implements OnInit {

  arrOfInputValue: HistoryItemViewModel[] = [];

  constructor(
    private _storage: LocalStorageService,
    private _managerService: ManagerService,
  ) {

    this._storage.getHistoryFromLocalStorage().subscribe(data => {
      data.forEach(element => {
        this.arrOfInputValue.push(element);
      });

    });
  }

  ngOnInit(): void {
    this.subscribeOnSearchEvent();
  }

  private subscribeOnSearchEvent(): void {

    this._managerService.onSearchEvent
      .subscribe(res => {

        if(this.arrOfInputValue.length+1 > 15) {
          this.arrOfInputValue.splice(0, 1);
        }

        this.arrOfInputValue.push(new HistoryItemViewModel(res));

      });
  }

  public getValue(objectHistoryItem: HistoryItemViewModel): void {
    this._managerService.onHistoryEvent.next(objectHistoryItem);
  }

}
