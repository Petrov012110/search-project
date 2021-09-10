import { ITwitchCnanelData } from "../../../environments/interface";
import { ParentModel } from "../parent.model";

export class TwitchChanelModel extends ParentModel {
    public broadcaster_language!: string;
    public display_name!: string;
    public game_name!: string;
    public id!: string;


    constructor(data: ITwitchCnanelData) {
        super();
        if (data) {
            this.display_name = data.display_name;
            this.game_name = data.game_name;
            this.id = data.id;
            this.broadcaster_language = data.broadcaster_language;

        }
    }
}