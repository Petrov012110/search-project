import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { IGitRepositoriesResponse, IGitUsersResponse, ITwitchChanelResponse, ITwitchResponse, ITwitchToken, IWikiResponse } from "src/environments/interface";
import { tap, map, catchError } from 'rxjs/operators';
import { GitRepositoryResponseModel } from "../models/git-repository/git.response-model";
import { GitRepositoryModel } from "../models/git-repository/git.model";
import { WikiResponseModel } from "../models/wiki/wiki.response-model";
import { WikiModel } from "../models/wiki/wiki.model";
import { TwitchCategoryResponseModel } from "../models/twitch-category/twitchCategory.response-model";
import { TwitchCategoryModel } from "../models/twitch-category/twitchCategory.model";
import { TwitchChanelResponseModel } from "../models/twitch-chanels/twitchChanel.response-model";
import { TwitchChanelModel } from "../models/twitch-chanels/twitchChanel.model";
import { GitUserResponseModel } from "../models/git-user/gitUser.response-model";
import { GitUserModel } from "../models/git-user/gitUser.model";


@Injectable()
export class ResourceService {

    constructor(private http: HttpClient) {

    }

    private _token = "qs1zvwtakojmcfrmoxjcszqhbli32m"

    public getTwitchCategories(data: string): Observable<TwitchCategoryModel[]> {

        return this.http.get<ITwitchResponse>(`https://api.twitch.tv/helix/searc/categories?query=${data}`, {
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

    public getGitRepositories(data: string): Observable<GitRepositoryModel[]> {

        return this.http.get<IGitRepositoriesResponse>(`https://api.github.com/search/repositories?q=${data}`)
            .pipe(
                map((response: GitRepositoryResponseModel): GitRepositoryModel[] => {
                    return response.items.map(item => new GitRepositoryModel(item))
                })
            )

    }

    public getGitUsers(data: string): Observable<GitUserModel[]> {

        return this.http.get<IGitUsersResponse>(`https://api.github.com/search/users?q=${data}`)
            .pipe(
                map((response: GitUserResponseModel): GitUserModel[] => {
                    return response.items.map(item => new GitUserModel(item))
                })
            )

    }

    public getWikiData(data: string): Observable<WikiModel[]> {

        return this.http.get<IWikiResponse>(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=${data}&srlimit=30`)
            .pipe(
                map((response: WikiResponseModel): WikiModel[] => {
                    return response.query.search.map(item => new WikiModel(item))
                })
            )
    }

}