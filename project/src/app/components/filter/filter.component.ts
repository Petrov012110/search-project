import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';
import { FilterViewModel } from './models/filter.view-model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./style/filter.component.scss']
})
export class FilterComponent implements OnInit {

  /** filter вью модель всего фильтра(чекбоксы и др.) */
  public filter: FilterViewModel = new FilterViewModel();
  public checkedvalues: string[] = []

  constructor(private _managerService: ManagerService) { }

  ngOnInit(): void {
  }


}
