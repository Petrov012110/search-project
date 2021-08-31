import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./style/history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(
    private _storage: LocalStorageService,
    private _managerService: ManagerService
  ) {
    this._storage.getHistoryFromLocalStorage().subscribe(data => {
      console.log(data);

    })
  }


  ngOnInit(): void {
    this.subscribeOnSearchEvent();
  }

  private subscribeOnSearchEvent(): void {
    this._managerService.onSearchEvent
      .subscribe(res => {
        console.log((res));
      })
  }

}
