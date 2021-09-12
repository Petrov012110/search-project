import { IWikiData, IWikiResponse } from "../../../environments/interface";

export class WikiResponseModel {
    public batchcomplete: string = '';
    public continue!: object;
    public query!: {
        search: IWikiData[]
        searchinfo: {totalhits: number}
    }

    constructor(data: IWikiResponse) {
        this.batchcomplete = data.batchcomplete;
        this.continue = data.continue;
        this.query = data.query;
    }
}
