import { ITwitchCnanelData } from "../../../environments/interface";
import { ParentResourseModel } from "../parent-resourse.model";

export class TwitchChanelModel extends ParentResourseModel {
    public broadcasterLanguage!: string;
    public displayName!: string;
    public gameName!: string;
    public id!: string;


    constructor(data: ITwitchCnanelData) {
        super();
        if (data) {
            this.displayName = data.display_name;
            this.gameName = data.game_name;
            this.id = data.id;
            this.broadcasterLanguage = data.broadcaster_language;

        }
    }
}