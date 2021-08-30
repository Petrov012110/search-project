import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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


  constructor(private _resours: ResourceService) { 

    this.inputForm = new FormGroup({
      "inputControl": new FormControl("")
    });

  }

  ngOnInit(): void {
    
  }

  public writeData(obj: object) {
    this.arrData.push(obj)
  }

  public getData(): void {

    console.log(this.inputForm.controls['inputControl'].value);
    
    let obj: object[] = [];
    
    this._resours.getTwitchData(this.inputForm.controls['inputControl'].value).subscribe(el => el.forEach((element: object) => {
      obj.push(element)
    }));
    this._resours.getGitData(this.inputForm.controls['inputControl'].value).subscribe(el => el.forEach((element: object) => {
      obj.push(element)
    }));
    this._resours.getWikiData(this.inputForm.controls['inputControl'].value).subscribe(el => el.forEach((element: object) => {
      obj.push(element)
    }));

    console.log(obj);
    
  }

  public createArr(text: string): string[] {
    return text.split(" ")
  }

}
