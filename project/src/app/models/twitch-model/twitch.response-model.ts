import { ITwitchData, ITwitchResponse } from "../../../environments/interface"

export class TwitchResponseModel {
    public data!: ITwitchData[];
    public pagination!: object;

    constructor(data: ITwitchResponse) {
        if(data) {
            this.data = data.data;
            this.pagination = data.pagination;
        }
    }
}