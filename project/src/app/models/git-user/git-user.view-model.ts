import { CommonViewModel } from '../common.view-model';
import { GitUserModel } from './git-user.model';

export class GitUserViewModel extends CommonViewModel {

    public resourse = 'Git(User)';

    constructor(model: GitUserModel) {
        super();
        this.name = model.login;
        this.content = model.url;
    }

}