import { ITwitchData } from "../../../environments/interface";

export class TwitchCategoryModel {

    public boxArtUrl!: string;
    public id!: string;
    public name!: string;

    constructor(data: ITwitchData) {

        if (data) {
            this.boxArtUrl = data.box_art_url;
            this.id = data.id;
            this.name = data.name;
        }
    }
}