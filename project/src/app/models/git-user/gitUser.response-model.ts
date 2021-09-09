import { IGitUserData, IGitUsersResponse } from "src/environments/interface";

export class GitUserResponseModel {
    public incomplete_results: boolean = false;
    public items: IGitUserData[] = [];
    public total_count!: number;

    constructor(data: IGitUsersResponse) {
        if (data) {
            this.incomplete_results = data.incomplete_results;
            this.items = data.items;
            this.total_count = data.total_count;
        }
    }
}