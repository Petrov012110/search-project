import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GitViewModel } from 'src/app/models/git-model/git.view-model';
import { IGitData, ITwitchData, IWikiData} from 'src/environments/interface';
import { LocalStorageService } from '../../services/localStorage.service';
import { ManagerService } from '../../services/manager.service';
import { ResourceService } from '../../services/resourses.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./style/search.component.scss']
})
export class SearchComponent implements OnInit {


  text: string = "";
  inputForm: FormGroup;
  arrData: object[] = []


  constructor(
    private _resours: ResourceService,
    private _storage: LocalStorageService,
    private _managerService: ManagerService
  ) {

    this.inputForm = new FormGroup({
      "inputControl": new FormControl("")
    });

  }

  public ngOnInit(): void {

  }

  public getData(): void {

    // console.log(this.inputForm.controls['inputControl'].value);

    this._storage.setHistoryToLocalStorage(this.inputForm.controls['inputControl'].value);
    this._managerService.onSearchEvent.next(this.inputForm.controls['inputControl'].value);


    // let obj: TTableData = {
    //   twitch: [],
    //   git: [],
    //   wiki: []
    // };

    // this._resours.getTwitchData(this.inputForm.controls['inputControl'].value).subscribe(el => el.forEach((element: ITwitchData) => {
    //   obj.twitch.push(element)
    // }));
    this._resours.getGitData(this.inputForm.controls['inputControl'].value).subscribe(el => el.forEach((element) => {
      console.log(element);
      
      let newElement = new GitViewModel(element)
      console.log("VIEW_MODEL", newElement);
    }));
    // this._resours.getWikiData(this.inputForm.controls['inputControl'].value).subscribe(el => el.forEach((element: IWikiData) => {
    //   obj.wiki.push(element)
    // }));

    // this._managerService.onServerAnswerEvent.next(obj)

    // console.log(obj);

  }

}
