import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { IGitResponse, ITwitchResponse, ITwitchToken, IWikiResponse } from "src/environments/interface";
import { tap, map, catchError } from 'rxjs/operators';
import { GitResponseModel } from "../models/git-model/git.response-model";
import { GitModel } from "../models/git-model/git.model";
import { WikiResponseModel } from "../models/wiki-model/wiki.response-model";
import { WikiModel } from "../models/wiki-model/wiki.model";
import { TwitchResponseModel } from "../models/twitch-model/twitch.response-model";
import { TwitchModel } from "../models/twitch-model/twitch.model";
// import { RequestOptions } from "https";

@Injectable()
export class ResourceService {

    constructor(private http: HttpClient) { }

    private _token = "a125z72n3jrid8bqrlyxccqb8xlzaz"

    // get token() {
    //     let expDate = new Date(<string>localStorage.getItem("twitch-token-expires"));
    //     if (new Date() > expDate) {
    //         this.getTwitchToken();
    //         return null
    //     }
    //     return localStorage.getItem("twitch-token");
    // }

    public getTwitchData(data: string): Observable<TwitchModel[]> {

        return this.http.get<ITwitchResponse>(`https://api.twitch.tv/helix/search/categories?query=${data}`, {
            headers: {
                "Client-Id": `${environment.clientId}`,
                "Authorization": `Bearer ${this._token}`
            }
        }).pipe(
            map((response: TwitchResponseModel): TwitchModel[] => {
                return response.data.map(item => new TwitchModel(item))
            }),
            catchError(error => {
                console.log('error: ', error);
                return of(error);
            })
        )
    }

    // public getTwitchToken(): Observable<any> {

    //     const params = new HttpParams()
    //         .set("client_id", `${environment.clientId}`)
    //         .set("client_secret", `${environment.client_secret}`)
    //         .set("grant_type", "client_credentials");

    //     return this.http.post<ITwitchToken>(`https://id.twitch.tv/oauth2/token?client_id=u4bc8k2muq2vms0dw3n1seg1acmsmm&client_secret=qidntfvbud0od92iw9y98ksklckrl2&grant_type=client_credentials`, null)
    //         .pipe(
    //             tap(this.setToken)
    //         )
    // }

    private setToken(response: ITwitchToken) {
        let expiresDate = new Date(new Date().getTime() + +response.expires_in * 1000);
        localStorage.setItem("twitch-token", response.access_token)
        localStorage.setItem("twitch-token-expires", expiresDate.toString())

    }

    public getGitData(data: string): Observable<GitModel[]> {

        return this.http.get<IGitResponse>(`https://api.github.com/search/repositories?q=${data}`)
            .pipe(
                map((response: GitResponseModel): GitModel[] => {
                    return response.items.map(item => new GitModel(item))
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