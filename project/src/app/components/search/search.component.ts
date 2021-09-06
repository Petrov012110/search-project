import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
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
    public checkboxes!: FormGroup;
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
        // throw new Error('test error')

        if (!this.inputForm.controls['inputControl'].value) {
            return;
        }

        forkJoin(this.arrayQuery(this.checkboxes, this.inputForm.controls['inputControl'].value))
            .pipe(
                catchError((error: any) => {
                    console.log(error)

                    return throwError(error);
                    // прокинуть в error компоненту
                }),
                tap((response: (TwitchCategoryModel[] | GitRepositoryModel[] | WikiModel[] | TwitchChanelModel[] | GitUserModel[])[]) => {
                    const tableItems: ITable[] = [];
                    let counter = 0
                    response.forEach(item => {
                        item.forEach((el: TwitchCategoryModel | GitRepositoryModel | WikiModel | TwitchChanelModel | GitUserModel) => {
                            tableItems.push(new CommonViewModel(el));
                            counter++;
                        })
                    });
                    this._managerService.onServerAnswerEvent.next(tableItems);
                    this._managerService.onCounterEvent.next(counter)
                })
            ).subscribe();

        this._storage.setHistoryToLocalStorage(this.inputForm.controls['inputControl'].value);
        this._managerService.onSearchEvent.next(this.inputForm.controls['inputControl'].value);



    }

    public arrayQuery(filter: FormGroup, input: string): (Observable<TwitchCategoryModel[]> | Observable<GitRepositoryModel[]> | Observable<WikiModel[]> | Observable<TwitchChanelModel[]> | Observable<GitUserModel[]>)[] {
        let arr: (Observable<TwitchCategoryModel[]> | Observable<GitRepositoryModel[]> | Observable<WikiModel[]> | Observable<TwitchChanelModel[]> | Observable<GitUserModel[]>)[] = []

        if (filter.controls['wikiControl'].value) {
            arr.push(this._resours.getWikiData(input))
        }
        if (filter.controls['gitControl'].value) {
            if (filter.controls['gitRepositoryControl'].value) {
                /**
                 * репозиторий 
                 */
                arr.push(this._resours.getGitRepositories(input));
            }
            if (filter.controls['gitUserControl'].value) {
                /**
                 * запрос на юзера 
                 */
                arr.push(this._resours.getGitUsers(input));
            }
        }
        if (filter.controls['twitchControl'].value) {
            if (filter.controls['twitchCategoryControl'].value) {
                /**
                 * категории
                 */
                arr.push(this._resours.getTwitchCategories(input));
            }
            if (filter.controls['twitchChanelControl'].value) {
                /**
                 * каналы
                 */
                arr.push(this._resours.getTwitchChannels(input));
            }
        }

        return arr;
    }

    public getValueCheckboxes(): void {
        this._managerService.onCheckboxEvent
            .subscribe(value => {
                this.checkboxes = value
                console.log("FORMA", value.controls);

            })
    }

    public getValueHistory(): void {
        this._managerService.onHistoryEvent
            .subscribe(value => {
                this.inputForm.controls['inputControl'].setValue(value);
                this.getData();
            })
    }

    public validator(): boolean {
        return true
        // if (this.checkboxes) {
        //     return this.checkboxes.some(item => item.checked === true);
        // } else {
        //     return false;
        // }
    }

}
