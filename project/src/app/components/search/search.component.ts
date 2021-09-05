import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GitRepositoryModel } from 'src/app/models/gitRepository-model/git.model';

import { TwitchCategoryModel } from 'src/app/models/twitchCategory-model/twitchCategory.model';
import { TwitchChanelModel } from 'src/app/models/twitchChanels-model/twitchChanel.model';
import { WikiModel } from 'src/app/models/wiki-model/wiki.model';
import { ITable } from 'src/environments/interface';
import { LocalStorageService } from '../../services/localStorage.service';
import { ManagerService } from '../../services/manager.service';
import { ResourceService } from '../../services/resourses.service';
import { CheckboxModel } from '../filter/models/checkbox.model';
import { GitUserModel } from 'src/app/models/gitUser-model/gitUser.model';
import { CommonViewModel } from 'src/app/models/common.view-model';


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
  public checkboxes!: CheckboxModel[];
  public errorMessage: string;

  constructor(
    private _resours: ResourceService,
    private _storage: LocalStorageService,
    private _managerService: ManagerService,
  ) {
    this.errorMessage = "Задайте фильтр"
    this.inputForm = new FormGroup({
      "inputControl": new FormControl("", Validators.maxLength(25))
    });

  }

  public ngOnInit(): void {
    this.getValueCheckboxes();
    this.getValueHistory();
  }

  public getData(): void {
    if (!this.inputForm.controls['inputControl'].value) {
      return;
    }

    forkJoin(this.arrayQuery(this.checkboxes, this.inputForm.controls['inputControl'].value))
      .pipe(
        tap((response: (TwitchCategoryModel[] | GitRepositoryModel[] | WikiModel[] | TwitchChanelModel[] | GitUserModel[])[]) => {
          const tableItems: ITable[] = [];
          response.forEach(item => {
            item.forEach((el: TwitchCategoryModel | GitRepositoryModel | WikiModel | TwitchChanelModel | GitUserModel) => tableItems.push(new CommonViewModel(el)))
          });
          this._managerService.onServerAnswerEvent.next(tableItems);
        })
      ).subscribe();

    this._storage.setHistoryToLocalStorage(this.inputForm.controls['inputControl'].value);
    this._managerService.onSearchEvent.next(this.inputForm.controls['inputControl'].value);

  }

  public arrayQuery(filter: CheckboxModel[], input: string): (Observable<TwitchCategoryModel[]> | Observable<GitRepositoryModel[]> | Observable<WikiModel[]> | Observable<TwitchChanelModel[]> | Observable<GitUserModel[]>)[] {
    let arr: (Observable<TwitchCategoryModel[]> | Observable<GitRepositoryModel[]> | Observable<WikiModel[]> | Observable<TwitchChanelModel[]> | Observable<GitUserModel[]>)[] = []
    filter.forEach(item => {
      if (item.label === "Wikipedia" && item.checked) {
        arr.push(this._resours.getWikiData(input))
      } else if (item.label === "GitHub" && item.checked) {
        if (item.checked1) {
          /**
           * репозиторий 
           */
          arr.push(this._resours.getGitRepositories(input));
        }
        if (item.checked2) {
          /**
           * написать запрос на юзера 
           */
          arr.push(this._resours.getGitUsers(input));
        }
      } else if (item.label === "Twitch" && item.checked) {
        if (item.checked1) {
          /**
           * категории
           */
          arr.push(this._resours.getTwitchCategories(input));
        }
        if (item.checked2) {
          /**
           * каналы
           */
          arr.push(this._resours.getTwitchChannels(input));
        }
      }
    });
    return arr;
  }

  public getValueCheckboxes(): void {
    this._managerService.onCheckboxEvent
      .subscribe(value => {
        this.checkboxes = value
      })
  }

  public getValueHistory(): void {
    this._managerService.onHistoryEvent
      .subscribe(value => this.inputForm.controls['inputControl'].setValue(value))
  }

  public validator(): boolean {
    if(this.checkboxes) {
      return this.checkboxes.some(item => item.checked === true);
    } else {
      return false;
    }
  }

}
