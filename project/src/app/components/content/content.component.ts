import { Component, OnInit } from '@angular/core';
import { ICommonViewModel } from '../../../environments/interface';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./style/content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private _managerService: ManagerService) { }

  public tableData: ICommonViewModel[] = [];

  public ngOnInit(): void {
    this.subscribeOnServerAnswerEvent();
  }

  private subscribeOnServerAnswerEvent(): void {
    this._managerService.onServerAnswerEvent
      .subscribe(res => this.tableData = res);
  }

}
