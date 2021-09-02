import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITable, IWikiData } from 'src/environments/interface';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./style/content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private _managerService: ManagerService) { }

  history: object[] = [];
  tableData: ITable[] = []  


  wiki: IWikiData[] = [];
  git: object[] = [];
  twitch: object[] = [];



  ngOnInit(): void {
    this.subscribeOnServerAnswerEvent();
  }

  private subscribeOnServerAnswerEvent(): void {
    this._managerService.onServerAnswerEvent
      .subscribe(res => this.tableData = res);
  }

  // public createWikiObject(obj: object[]) {
  //   obj.forEach((el: TTableData) => {
  //     el.wiki.
  //   })
  // }


  

}
