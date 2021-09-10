import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../../app/services/manager.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./style/filter.component.scss']
})
export class FilterComponent implements OnInit {

  public lengthContent!: number;

  constructor(private _managerService: ManagerService) { }

  public ngOnInit(): void {
    this._managerService.onCounterEvent
      .subscribe(value => {
        this.lengthContent = value;
      })
  }
}
