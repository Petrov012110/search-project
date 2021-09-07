import { GitRepositoryModel } from "./gitRepository-model/git.model";
import { GitUserModel } from "./gitUser-model/gitUser.model";
import { TwitchCategoryModel } from "./twitchCategory-model/twitchCategory.model";
import { TwitchChanelModel } from "./twitchChanels-model/twitchChanel.model";
import { WikiModel } from "./wiki-model/wiki.model";

export class CommonViewModel {
    public name: string = " -";
    public content: string = " -";
    public resourse: string = " -";

    constructor(data: GitRepositoryModel | TwitchCategoryModel | TwitchChanelModel | GitUserModel | WikiModel) {
        if (data instanceof GitRepositoryModel) {
            this.name = data.name
            this.content = data.html_url
            this.resourse = "Git (repository)"
        } else if (data instanceof GitUserModel) {
            this.name = data.login
            this.content = data.url
            this.resourse = "Git (user)"
        } else if (data instanceof TwitchCategoryModel) {
            this.name = data.name
            this.content = data.box_art_url
            this.resourse = "Twitch (category)"
        } else if (data instanceof TwitchChanelModel) {
            this.name = data.display_name
            this.content = data.game_name
            this.resourse = "Twitch (chanel)"
        } else if (data instanceof WikiModel) {
            this.name = data.title;
            this.content = data.snippet;
            this.resourse = "Wikipedia"
        }
    }
}