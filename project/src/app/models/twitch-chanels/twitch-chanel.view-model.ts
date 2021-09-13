import { CommonViewModel } from '../common.view-model';
import { TwitchChanelModel } from './twitch-chanel.model';


export class TwitchChanelViewModel extends CommonViewModel {

    public resourse = 'Twitch(Chanel)';

    constructor(model: TwitchChanelModel) {
        super();
        this.name = model.displayName;
        this.content = model.gameName;
    }

}