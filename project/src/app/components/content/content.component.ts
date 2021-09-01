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
      .subscribe(res => {

        for(const key in res) {
          if(key == "wiki") {
            res.wiki.forEach(el => {
              this.tableData.push({
                content: el.snippet,
                name: el.title,
                resourse: "Wikipedia"
              })
            })
          } else if(key == "twitch") {
            res.twitch.forEach(el => {
              this.tableData.push({
                content: el.box_art_url,
                name: el.name,
                resourse: "Twitch"
              })
            })
          } else if(key == "git") {
            res.git.forEach(el => {
              this.git.push({
                content: el.html_url,
                name: el.name,
                resourse: "Git"
              })
            });
          }
        }
        console.log("tableData", this.tableData);
        
        // this.wiki = res.wiki;
        // this.git = res.git;
        // this.twitch = res.twitch;
        // console.log("wiki", this.wiki);
        // console.log("git", this.git);
        // console.log("twitch", this.twitch);
        
        // this.history.push(res);
        // console.log(this.history);
        
      });
  }

  // public createWikiObject(obj: object[]) {
  //   obj.forEach((el: TTableData) => {
  //     el.wiki.
  //   })
  // }


  

}
