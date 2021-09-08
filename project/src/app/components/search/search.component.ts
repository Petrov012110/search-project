import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable, Subject, throwError } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { CommonViewModel } from 'src/app/models/common.view-model';
import { ControlsViewModel } from 'src/app/models/controls.view-model';
import { GitRepositoryModel } from 'src/app/models/gitRepository-model/git.model';
import { GitUserModel } from 'src/app/models/gitUser-model/gitUser.model';
import { TwitchCategoryModel } from 'src/app/models/twitchCategory-model/twitchCategory.model';
import { TwitchChanelModel } from 'src/app/models/twitchChanels-model/twitchChanel.model';
import { WikiModel } from 'src/app/models/wiki-model/wiki.model';
import { ITable } from 'src/environments/interface';
import { LocalStorageService } from '../../services/localStorage.service';
import { ManagerService } from '../../services/manager.service';
import { ResourceService } from '../../services/resourses.service';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./style/search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {


    public text: string = "";
    public inputForm: FormGroup;
    public arrData: object[] = []
    public arrOfInputValue: string[] = [];
    public checkboxes!: FormGroup;
    public errorMessage: string;
    private _unsubscriber: Subject<void> = new Subject<void>();
    public controls!: ControlsViewModel;

    constructor(
        private _resours: ResourceService,
        private _storage: LocalStorageService,
        private _managerService: ManagerService,
    ) {
        this.errorMessage = "Задайте фильтр"
        this.inputForm = new FormGroup({
            "inputControl": new FormControl("", Validators.maxLength(15))
        });


    }

    public ngOnInit(): void {
        this.getValueCheckboxes();
        this.getValueHistory();
    }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }

    public getData(): void {
        // throw new Error('test error')

        if (!this.inputForm.controls['inputControl'].value) {
            return;
        }

        forkJoin(this.arrayQuery( this.controls, this.inputForm.controls['inputControl'].value))
            .pipe(
                
                // catchError((error: HttpErrorResponse) => {
                //     // this._handleErrorService.setError(error);
                //     return throwError(error);
                // }),
                takeUntil(this._unsubscriber)

            ).subscribe((response: (TwitchCategoryModel[] | GitRepositoryModel[] | WikiModel[] | TwitchChanelModel[] | GitUserModel[])[]) => {

                const tableItems: ITable[] = [];
                let counter = 0

                response.forEach(item => {
                    item.forEach((el: TwitchCategoryModel | GitRepositoryModel | WikiModel | TwitchChanelModel | GitUserModel) => {
                        tableItems.push(new CommonViewModel(el));
                        
                        
                   
                        counter++;
                    })
                });

                this._managerService.onServerAnswerEvent.next(tableItems);
                this._managerService.onCounterEvent.next(counter);
            });

        this._storage.setHistoryToLocalStorage(this.inputForm.controls['inputControl'].value, this.controls);
        this._managerService.onSearchEvent.next(this.inputForm.controls['inputControl'].value);

    }

    public arrayQuery(filter: ControlsViewModel, input: string): (Observable<TwitchCategoryModel[]> | Observable<GitRepositoryModel[]> | Observable<WikiModel[]> | Observable<TwitchChanelModel[]> | Observable<GitUserModel[]>)[] {

        let arr: (Observable<TwitchCategoryModel[]> | Observable<GitRepositoryModel[]> | Observable<WikiModel[]> | Observable<TwitchChanelModel[]> | Observable<GitUserModel[]>)[] = [];

        if(filter) {
            if (filter.wikiControl) {
                arr.push(this._resours.getWikiData(input));
            }
            if (filter.gitControl) {
                if (filter.repositoriesControl) {
                    /**
                     * репозиторий 
                     */
                    arr.push(this._resours.getGitRepositories(input));
                }
                if (filter.usersControl) {
                    /**
                     * запрос на юзера 
                     */
                    arr.push(this._resours.getGitUsers(input));
                }
            }
            if (filter.twitchControl) {
                if (filter.categoriesControl) {
                    /**
                     * категории
                     */
                    arr.push(this._resours.getTwitchCategories(input));
                }
                if (filter.chanelsControl) {
                    /**
                     * каналы
                     */
                    arr.push(this._resours.getTwitchChannels(input));
                }
            }
            
        }
        return arr;
    }

    public getValueCheckboxes(): void {
        this._managerService.onCheckboxEvent
            .subscribe(value => {
                this.controls = new ControlsViewModel(value);
            });
    }

    public getValueHistory(): void {
        this._managerService.onHistoryEvent
            .subscribe(value => {
                this.inputForm.controls['inputControl'].setValue(value.input);
                this.controls = this._storage.getHistoryControls(value);
                this.getData();
                this._managerService.onHistoryControlsEvent.next(this._storage.getHistoryControls(value));
            });
    }

}
