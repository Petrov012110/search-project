import { CommonViewModel } from '../common.view-model';
import { GitRepositoryModel } from './git-repository.model';


export class GitRepositoryViewModel extends CommonViewModel {

    public resourse = 'Git(Repository)';

    constructor(model: GitRepositoryModel) {
        super();
        this.name = model.name;
        this.content = model.htmlUrl;
    }

}