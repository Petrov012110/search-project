import { ITwitchCnanelData } from "../../../environments/interface";

export class TwitchChanelModel {
    broadcaster_language!: string;
    display_name!: string;
    game_name!: string;
    id!: string;


    constructor(data: ITwitchCnanelData) {
        if (data) {
            this.display_name = data.display_name;
            this.game_name = data.game_name;
            this.id = data.id;
            this.broadcaster_language = data.broadcaster_language

        }
    }
}