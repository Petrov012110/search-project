import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import { IGitRepositoriesResponse, IGitUsersResponse, ITwitchChanelResponse, ITwitchResponse, IWikiResponse } from "../../environments/interface";
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
import { ParentModel } from "../models/parent.model";


@Injectable()
export class ResourceService {

    private token = 'qs1zvwtakojmcfrmoxjcszqhbli32m';

    constructor(private http: HttpClient) {

    }

    public getTwitchCategories(data: string): Observable<TwitchCategoryModel[]> {

        return this.http.get<ITwitchResponse>(`https://api.twitch.tv/helix/searc/categories?query=${data}`, {
            headers: {
                'Client-Id': `${environment.clientId}`,
                'Authorization': `Bearer ${this.token}`
            }
        }).pipe(
            map((response: TwitchCategoryResponseModel): TwitchCategoryModel[] => {
                return response.data.map(item => new TwitchCategoryModel(item))
            })
        )
    }

    public getTwitchChannels(data: string): Observable<ParentModel[]> {

        return this.http.get<ITwitchChanelResponse>(`https://api.twitch.tv/helix/search/channels?query=${data}`, {
            headers: {
                'Client-Id': `${environment.clientId}`,
                'Authorization': `Bearer ${this.token}`
            }
        }).pipe(
            map((response: TwitchChanelResponseModel): TwitchChanelModel[] => {
                return response.data.map(item => new TwitchChanelModel(item))
            })
        )
    }

    public getGitRepositories(data: string): Observable<ParentModel[]> {

        return this.http.get<IGitRepositoriesResponse>(`https://api.github.com/search/repositories?q=${data}`)
            .pipe(
                map((response: GitRepositoryResponseModel): GitRepositoryModel[] => {
                    return response.items.map(item => new GitRepositoryModel(item))
                })
            )

    }

    public getGitUsers(data: string): Observable<ParentModel[]> {

        return this.http.get<IGitUsersResponse>(`https://api.github.com/search/users?q=${data}`)
            .pipe(
                map((response: GitUserResponseModel): GitUserModel[] => {
                    return response.items.map(item => new GitUserModel(item))
                })
            )

    }

    public getWikiData(data: string): Observable<ParentModel[]> {

        return this.http.get<IWikiResponse>(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=${data}&srlimit=30`)
            .pipe(
                map((response: WikiResponseModel): WikiModel[] => {
                    return response.query.search.map(item => new WikiModel(item))
                })
            )
    }

}