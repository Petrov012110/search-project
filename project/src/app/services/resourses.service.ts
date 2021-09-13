import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { forkJoin, Observable, Subject, throwError } from "rxjs";
import { catchError, map, takeUntil } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import { IGitRepositoriesResponse, IGitUsersResponse, ICommonViewModel, ITwitchChanelResponse, ITwitchResponse, IWikiResponse } from "../../environments/interface";
import { GitRepositoryResponseModel } from "../models/git-repository/git-repository.response-model";
import { GitRepositoryModel } from "../models/git-repository/git-repository.model";
import { WikiResponseModel } from "../models/wiki/wiki.response-model";
import { WikiModel } from "../models/wiki/wiki.model";
import { TwitchCategoryResponseModel } from "../models/twitch-category/twitch-category.response-model";
import { TwitchCategoryModel } from "../models/twitch-category/twitch-category.model";
import { TwitchChanelResponseModel } from "../models/twitch-chanels/twitch-chanel.response-model";
import { TwitchChanelModel } from "../models/twitch-chanels/twitch-chanel.model";
import { GitUserResponseModel } from "../models/git-user/git-user.response-model";
import { GitUserModel } from "../models/git-user/git-user.model";
import { ParentResourseModel } from "../models/parent-resourse.model";
import { CommonViewModel } from "../models/common.view-model";
import { ManagerService } from "./manager.service";
import { ControlsViewModel } from "../models/controls.view-model";
import { WikiViewModel } from "../models/wiki/wiki.view-model";
import { TwitchChanelViewModel } from "../models/twitch-chanels/twitch-chanel.view-model";
import { TwitchCategoryViewModel } from "../models/twitch-category/twitch-category.view-model";
import { GitUserViewModel } from "../models/git-user/git-user.view-model";
import { GitRepositoryViewModel } from "../models/git-repository/git-repository.view-model";


@Injectable()
export class ResourceService implements OnDestroy {

    private _token = 'qs1zvwtakojmcfrmoxjcszqhbli32m';
    private _unsubscriber: Subject<void> = new Subject<void>();

    constructor(
        private _http: HttpClient,
        private _managerService: ManagerService,
    ) { }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }

    private getTwitchCategories(data: string): Observable<TwitchCategoryViewModel[]> {

        return this._http.get<ITwitchResponse>(`https://api.twitch.tv/helix/searc/categories?query=${data}`, {
            headers: {
                'Client-Id': `${environment.clientId}`,
                Authorization: `Bearer ${this._token}`
            }
        }).pipe(
            map((response: TwitchCategoryResponseModel): TwitchCategoryViewModel[] => {
                const modelList = response.data.map(item => new TwitchCategoryModel(item))
                const viewModelList = modelList.map(model => new TwitchCategoryViewModel(model))

                return viewModelList;
            })
        )
    }

    private getTwitchChannels(data: string): Observable<TwitchChanelViewModel[]> {

        return this._http.get<ITwitchChanelResponse>(`https://api.twitch.tv/helix/search/channels?query=${data}`, {
            headers: {
                'Client-Id': `${environment.clientId}`,
                Authorization: `Bearer ${this._token}`
            }
        }).pipe(
            map((response: TwitchChanelResponseModel): TwitchChanelViewModel[] => {
                const modelList = response.data.map(item => new TwitchChanelModel(item))
                const viewModelList = modelList.map(model => new TwitchChanelViewModel(model))

                return viewModelList;
            })
        )
    }

    private getGitRepositories(data: string): Observable<GitRepositoryViewModel[]> {

        return this._http.get<IGitRepositoriesResponse>(`https://api.github.com/search/repositories?q=${data}`)
            .pipe(
                map((response: GitRepositoryResponseModel): GitRepositoryViewModel[] => {
                    // return response.items.map(item => new GitRepositoryModel(item))
                    const modelList = response.items.map(item => new GitRepositoryModel(item))
                    const viewModelList = modelList.map(model => new GitRepositoryViewModel(model))
    
                    return viewModelList;
                })
            )

    }

    private getGitUsers(data: string): Observable<GitUserViewModel[]> {

        return this._http.get<IGitUsersResponse>(`https://api.github.com/search/users?q=${data}`)
            .pipe(
                map((response: GitUserResponseModel): GitUserViewModel[] => {
                    // return response.items.map(item => new GitUserModel(item))
                    const modelList = response.items.map(item => new GitUserModel(item))
                    const viewModelList = modelList.map(model => new GitUserViewModel(model))
    
                    return viewModelList;
                })
            )

    }

    private getWikiData(data: string): Observable<WikiViewModel[]> {

        return this._http.get<IWikiResponse>(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=${data}&srlimit=30`)
            .pipe(
                map((response: WikiResponseModel): WikiViewModel[] => {
                    const modelList = response.query.search.map(item => new WikiModel(item))
                    const viewModelList = modelList.map(model => new WikiViewModel(model))

                    return viewModelList;
                })
            )
    }

    public getDataFromResourses(controls: ControlsViewModel, valueInput: string): void {

        forkJoin(this.getArrayOfObservables(controls, valueInput))
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                }),
                takeUntil(this._unsubscriber)

            ).subscribe((response: (CommonViewModel[])[]) => {

                const tableItems: CommonViewModel[] = [];
                let counter = 0;

                response.forEach(item => {
                    item.forEach((el: CommonViewModel) => {
                        tableItems.push(el);
                        counter++;
                    });
                });

                this._managerService.onServerAnswerEvent.next(tableItems);
                this._managerService.onCounterEvent.next(counter);
            });
    }

    private getArrayOfObservables(filter: ControlsViewModel, input: string): Observable<CommonViewModel[]>[] {

        const arrOfObservables: Observable<CommonViewModel[]>[] = [];

        if (filter) {
            if (filter.wikiControl) {
                arrOfObservables.push(this.getWikiData(input));
            }
            if (filter.gitControl) {
                if (filter.repositoriesControl) {
                    /**
                     * репозиторий
                     */
                    arrOfObservables.push(this.getGitRepositories(input));
                }
                if (filter.usersControl) {
                    /**
                     * запрос на юзера
                     */
                    arrOfObservables.push(this.getGitUsers(input));
                }
            }
            if (filter.twitchControl) {
                if (filter.categoriesControl) {
                    /**
                     * категории
                     */
                    arrOfObservables.push(this.getTwitchCategories(input));
                }
                if (filter.chanelsControl) {
                    /**
                     * каналы
                     */
                    arrOfObservables.push(this.getTwitchChannels(input));
                }
            }

        }

        return arrOfObservables;
    }

}