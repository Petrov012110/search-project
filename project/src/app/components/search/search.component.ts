import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
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
    if (!this.inputForm.controls['inputControl'].value) {
      return;
    }

    const k: (Observable<TwitchModel[]> | Observable<GitModel[]> | Observable<WikiModel[]>)[] = [

    ]

    // if (filter.checkbox1) {
    //   k.push(this._resours.getTwitchData(this.inputForm.controls['inputControl'].value))
    // }

    forkJoin(k)
      .pipe(
        tap((response: (TwitchModel[] | GitModel[] | WikiModel[])[]) => {
          const tableItems: ITable[] = [];
          // twitch.forEach((object: TwitchModel) => tableItems.push(new TwitchViewModel(object)));
          // git.forEach((object: GitModel) => tableItems.push(new GitViewModel(object)));
          // wiki.forEach((object: WikiModel) => tableItems.push(new WikiViewModel(object)));
          this._managerService.onServerAnswerEvent.next(tableItems);
        })
      ).subscribe();

    this._storage.setHistoryToLocalStorage(this.inputForm.controls['inputControl'].value);
    this._managerService.onSearchEvent.next(this.inputForm.controls['inputControl'].value);

  }

  public getValueCheckboxes(): void {
    this._managerService.onCheckboxEvent
      .subscribe(value => {
        this.arrOfInputValue = value
        console.log("SearchComponent", this.arrOfInputValue);

      })
  }

}
