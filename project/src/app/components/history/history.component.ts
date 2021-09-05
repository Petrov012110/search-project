import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { ManagerService } from 'src/app/services/manager.service';
import { ResourceService } from 'src/app/services/resourses.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./style/history.component.scss']
})
export class HistoryComponent implements OnInit {

  arrOfInputValue: string[] = [];

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
        this.arrOfInputValue.push(this._storage.cutInputValue((res)));
      });
  }

  public getValue($event: any): void {
    this._managerService.onHistoryEvent.next($event.target.innerText)
  }

}
