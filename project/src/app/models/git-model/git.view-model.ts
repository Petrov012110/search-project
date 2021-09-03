import { TwitchModel } from "../twitch-model/twitch.model";
import { GitModel } from "./git.model";


export class GitViewModel {
    public name: string = " ";
    public content: string = " ";
    public resourse: string = " ";

    constructor(data: GitModel | TwitchModel) {
        if (data instanceof GitModel) {
            this.name = data.name
            this.content = data.html_url
            this.resourse = "Git"
        } else if (data instanceof TwitchModel) {

        }
    }
}