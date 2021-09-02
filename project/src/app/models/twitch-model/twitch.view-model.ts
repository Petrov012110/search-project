import { TwitchModel } from "./twitch.model";

export class TwitchViewModel {
    public name: string = " ";
    public content: string = " ";
    public resourse: string = " ";

    constructor(data: TwitchModel) {
        if(data) {
            this.name = data.name
            this.content = data.box_art_url
            this.resourse = "Twitch"
        }
    }
}