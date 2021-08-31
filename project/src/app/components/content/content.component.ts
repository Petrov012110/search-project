import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./style/content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private _managerService: ManagerService) { }

  history: object[] = [];
  historySub!: Subscription;

  ngOnInit(): void {
    this.subscribeOnServerAnswerEvent();
  }

  private subscribeOnServerAnswerEvent(): void {
    this._managerService.onServerAnswerEvent
      .subscribe(res => {
        this.history.push(res);
        console.log(this.history);
        
      });
  }


  

}
