import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable, Subject, throwError } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { CommonViewModel } from '../../../app/models/common.view-model';
import { ControlsViewModel } from '../../../app/models/controls.view-model';
import { GitRepositoryModel } from '../../models/git-repository/git-repository.model';
import { GitUserModel } from '../../models/git-user/git-user.model';
import { TwitchCategoryModel } from '../../models/twitch-category/twitch-category.model';
import { TwitchChanelModel } from '../../models/twitch-chanels/twitch-chanel.model';
import { WikiModel } from '../../../app/models/wiki/wiki.model';
import { ITable } from '../../../environments/interface';
import { LocalStorageService } from '../../services/local-storage.service';
import { ManagerService } from '../../services/manager.service';
import { ResourceService } from '../../services/resourses.service';
import { ParentModel } from 'src/app/models/parent.model';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./style/search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {

    public inputForm: FormGroup;
    public controls!: ControlsViewModel;
    private _unsubscriber: Subject<void> = new Subject<void>();

    constructor(
        private _resours: ResourceService,
        private _storage: LocalStorageService,
        private _managerService: ManagerService,
    ) {

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

        if (!this.inputForm.controls['inputControl'].value) {
            return;
        }

        forkJoin(this.getArrayOfObservables(this.controls, this.inputForm.controls['inputControl'].value))
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                }),
                takeUntil(this._unsubscriber)

            ).subscribe((response: (ParentModel[])[]) => {

                const tableItems: ITable[] = [];
                let counter = 0;

                response.forEach(item => {
                    item.forEach((el: ParentModel) => {
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

    public getArrayOfObservables(filter: ControlsViewModel, input: string): Observable<ParentModel[]>[] {

        let arrOfObservables: Observable<ParentModel[]>[] = [];

        if (filter) {
            if (filter.wikiControl) {
                arrOfObservables.push(this._resours.getWikiData(input));
            }
            if (filter.gitControl) {
                if (filter.repositoriesControl) {
                    /**
                     * репозиторий 
                     */
                    arrOfObservables.push(this._resours.getGitRepositories(input));
                }
                if (filter.usersControl) {
                    /**
                     * запрос на юзера 
                     */
                    arrOfObservables.push(this._resours.getGitUsers(input));
                }
            }
            if (filter.twitchControl) {
                if (filter.categoriesControl) {
                    /**
                     * категории
                     */
                    arrOfObservables.push(this._resours.getTwitchCategories(input));
                }
                if (filter.chanelsControl) {
                    /**
                     * каналы
                     */
                    arrOfObservables.push(this._resours.getTwitchChannels(input));
                }
            }

        }

        return arrOfObservables;
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
                this._managerService.onHistoryControlsEvent.next(this._storage.getHistoryControls(value));
                this.getData();
            });
    }

}
