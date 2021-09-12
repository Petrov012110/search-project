import { ITwitchData } from "../../../environments/interface";
import { ParentResourseModel } from "../parent-resourse.model";

export class TwitchCategoryModel extends ParentResourseModel {

    public boxArtUrl!: string;
    public id!: string;

    constructor(data: ITwitchData) {
        super();
        if (data) {
            this.boxArtUrl = data.box_art_url;
            this.id = data.id;
            this.name = data.name;
        }
    }
}