import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { IGitRepositoriesResponse, IGitUsersResponse, ITwitchChanelResponse, ITwitchResponse, ITwitchToken, IWikiResponse } from "src/environments/interface";
import { tap, map, catchError } from 'rxjs/operators';
import { GitRepositoryResponseModel } from "../models/gitRepository-model/git.response-model";
import { GitRepositoryModel } from "../models/gitRepository-model/git.model";
import { WikiResponseModel } from "../models/wiki-model/wiki.response-model";
import { WikiModel } from "../models/wiki-model/wiki.model";
import { TwitchCategoryResponseModel } from "../models/twitchCategory-model/twitchCategory.response-model";
import { TwitchCategoryModel } from "../models/twitchCategory-model/twitchCategory.model";
import { TwitchChanelResponseModel } from "../models/twitchChanels-model/twitchChanel.response-model";
import { TwitchChanelModel } from "../models/twitchChanels-model/twitchChanel.model";
import { GitUserResponseModel } from "../models/gitUser-model/gitUser.response-model";
import { GitUserModel } from "../models/gitUser-model/gitUser.model";


@Injectable()
export class ResourceService {

    constructor(private http: HttpClient) {

    }

    private _token = "qs1zvwtakojmcfrmoxjcszqhbli32m"

    public getTwitchCategories(data: string): Observable<TwitchCategoryModel[]> {

        return this.http.get<ITwitchResponse>(`https://api.twitch.tv/helix/search/categories?query=${data}`, {
            headers: {
                "Client-Id": `${environment.clientId}`,
                "Authorization": `Bearer ${this._token}`
            }
        }).pipe(
            map((response: TwitchCategoryResponseModel): TwitchCategoryModel[] => {
                return response.data.map(item => new TwitchCategoryModel(item))
            })
        )
    }

    public getTwitchChannels(data: string): Observable<TwitchChanelModel[]> {

        return this.http.get<ITwitchChanelResponse>(`https://api.twitch.tv/helix/search/channels?query=${data}`, {
            headers: {
                "Client-Id": `${environment.clientId}`,
                "Authorization": `Bearer ${this._token}`
            }
        }).pipe(
            map((response: TwitchChanelResponseModel): TwitchChanelModel[] => {
                return response.data.map(item => new TwitchChanelModel(item))
            })
        )
    }

    private setToken(response: ITwitchToken) {
        let expiresDate = new Date(new Date().getTime() + +response.expires_in * 1000);
        localStorage.setItem("twitch-token", response.access_token)
        localStorage.setItem("twitch-token-expires", expiresDate.toString())

    }

    public getGitRepositories(data: string): Observable<GitRepositoryModel[]> {

        return this.http.get<IGitRepositoriesResponse>(`https://api.github.com/search/repositories?q=${data}`)
            .pipe(
                map((response: GitRepositoryResponseModel): GitRepositoryModel[] => {
                    return response.items.map(item => new GitRepositoryModel(item))
                }),
                catchError(error => {
                    console.log('error: ', error);
                    return of(error);
                })
            )

    }

    public getGitUsers(data: string): Observable<GitUserModel[]> {

        return this.http.get<IGitUsersResponse>(`https://api.github.com/search/users?q=${data}`)
            .pipe(
                map((response: GitUserResponseModel): GitUserModel[] => {
                    return response.items.map(item => new GitUserModel(item))
                }),
                catchError(error => {
                    console.log('error: ', error);
                    return of(error);
                })
            )

    }

    public getWikiData(data: string): Observable<WikiModel[]> {

        return this.http.get<IWikiResponse>(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=${data}`)
            .pipe(
                map((response: WikiResponseModel): WikiModel[] => {
                    return response.query.search.map(item => new WikiModel(item))
                }),
                catchError(error => {
                    console.log('error: ', error);
                    return of(error);
                })
            )
    }

}