import { ITwitchChanelResponse, ITwitchCnanelData, ITwitchResponse } from "src/environments/interface";

export class TwitchChanelResponseModel {
    public data!: ITwitchCnanelData[];
    public pagination!: object;

    constructor(data: ITwitchChanelResponse ) {
        if(data) {
            this.data = data.data;
            this.pagination = data.pagination;
        }
    }
}