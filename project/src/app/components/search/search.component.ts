import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { GitModel } from 'src/app/models/git-model/git.model';
import { GitViewModel } from 'src/app/models/git-model/git.view-model';
import { TwitchModel } from 'src/app/models/twitch-model/twitch.model';
import { TwitchViewModel } from 'src/app/models/twitch-model/twitch.view-model';
import { WikiModel } from 'src/app/models/wiki-model/wiki.model';
import { WikiViewModel } from 'src/app/models/wiki-model/wiki.view-model';
import { ITable } from 'src/environments/interface';
import { LocalStorageService } from '../../services/localStorage.service';
import { ManagerService } from '../../services/manager.service';
import { ResourceService } from '../../services/resourses.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./style/search.component.scss']
})
export class SearchComponent implements OnInit {


  public text: string = "";
  public inputForm: FormGroup;
  public arrData: object[] = []
  public arrOfInputValue: string[] = [];

  constructor(
    private _resours: ResourceService,
    private _storage: LocalStorageService,
    private _managerService: ManagerService,
  ) {

    this.inputForm = new FormGroup({
      "inputControl": new FormControl("")
    });

  }

  public ngOnInit(): void {
    this.getValueCheckboxes();
  }

  public getData(): void {

    forkJoin([
      this._resours.getTwitchData(this.inputForm.controls['inputControl'].value),
      this._resours.getGitData(this.inputForm.controls['inputControl'].value),
      this._resours.getWikiData(this.inputForm.controls['inputControl'].value)
    ]).subscribe({
      next: value => {
        const tableItems: ITable[] = [];
        value[0].forEach((object: TwitchModel) => tableItems.push(new TwitchViewModel(object)));
        value[1].forEach((object: GitModel) => tableItems.push(new GitViewModel(object)));
        value[2].forEach((object: WikiModel) => tableItems.push(new WikiViewModel(object)));
        this._managerService.onServerAnswerEvent.next(tableItems)
      }

    });

    this._storage.setHistoryToLocalStorage(this.inputForm.controls['inputControl'].value);
    this._managerService.onSearchEvent.next(this.inputForm.controls['inputControl'].value);

  }

  public getValueCheckboxes(): void {
    this._managerService.onCheckboxEvent
      .subscribe(value => {
        this.arrOfInputValue = value
        console.log(this.arrOfInputValue);
        
      })
  }

}
