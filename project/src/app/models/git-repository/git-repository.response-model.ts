import { IGitRepositoryData, IGitRepositoriesResponse } from "../../../environments/interface";

export class GitRepositoryResponseModel {
    public incomplete_results = false;
    public items: IGitRepositoryData[] = [];
    public total_count!: number;

    constructor(data: IGitRepositoriesResponse) {
        if (data) {
            this.incomplete_results = data.incomplete_results;
            this.items = data.items;
            this.total_count = data.total_count;
        }
    }
}