import { IGitData, IGitResponse } from "../../../environments/interface";

export class GitResponseModel {
    public incomplete_results: boolean = false;
    public items: IGitData[] = [];
    public total_count!: number;

    constructor(data: IGitResponse) {
        if (data) {
            this.incomplete_results = data.incomplete_results;
            this.items = data.items;
            this.total_count = data.total_count;
        }
    }
}