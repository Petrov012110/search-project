import { GitRepositoryModel } from "./git-repository/git-repository.model";
import { GitUserModel } from "./git-user/git-user.model";
import { ParentResourseModel } from "./parent-resourse.model";
import { TwitchCategoryModel } from "./twitch-category/twitch-category.model";
import { TwitchChanelModel } from "./twitch-chanels/twitch-chanel.model";
import { WikiModel } from "./wiki/wiki.model";

export class CommonViewModel {

    public name!: string;
    public content!: string;
    public resourse!: string;

    constructor(data: ParentResourseModel) {

        if (data instanceof GitRepositoryModel) {
            this.name = data.name,
            this.content = data.htmlUrl,
            this.resourse = 'Git (repository)'
        } else if (data instanceof GitUserModel) {
            this.name = data.login,
            this.content = data.url,
            this.resourse = 'Git (user)'
        } else if (data instanceof TwitchCategoryModel) {
            this.name = data.name,
            this.content = data.boxArtUrl,
            this.resourse = 'Twitch (category)'
        } else if (data instanceof TwitchChanelModel) {
            this.name = data.displayName,
            this.content = data.gameName,
            this.resourse = 'Twitch (chanel)'
        } else if (data instanceof WikiModel) {
            this.name = data.title,
            this.content = data.snippet,
            this.resourse = 'Wikipedia'
        }
    }
}