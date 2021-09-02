import { ITwitchData } from "src/environments/interface";

export class TwitchModel {
    public box_art_url!: string
    public id!: string
    public name!: string

    constructor(data: ITwitchData) {
        if (data) {
            this.box_art_url = data.box_art_url;
            this.id = data.id;
            this.name = data.name;
        }
    }
}