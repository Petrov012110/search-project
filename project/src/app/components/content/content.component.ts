import { Component, OnInit } from '@angular/core';
import { ITable } from '../../../environments/interface';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./style/content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private _managerService: ManagerService) { }

  public tableData: ITable[] = [];

  public ngOnInit(): void {
    this._subscribeOnServerAnswerEvent();
  }

  private _subscribeOnServerAnswerEvent(): void {
    this._managerService.onServerAnswerEvent
      .subscribe(res => this.tableData = res);
  }

}
