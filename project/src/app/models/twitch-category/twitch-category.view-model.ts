import { CommonViewModel } from '../common.view-model';
import { TwitchCategoryModel } from './twitch-category.model';



export class TwitchCategoryViewModel extends CommonViewModel {

    public resourse = 'Twitch(Category)';

    constructor(model: TwitchCategoryModel) {
        super();
        this.name = model.name;
        this.content = model.boxArtUrl;
    }

}