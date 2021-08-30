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


  constructor(private _resours: ResourceService) { 

    this.inputForm = new FormGroup({
      "inputControl": new FormControl("")
    });

  }

  ngOnInit(): void {
    
  }

  public getData(): void {

    console.log(this.inputForm.controls['inputControl'].value);
    
    
    this._resours.getTwitchData(this.inputForm.controls['inputControl'].value).subscribe(el => console.log("Twitch", el));
    this._resours.getGitData(this.inputForm.controls['inputControl'].value).subscribe(el => console.log("Git", el));
    this._resours.getWikiData(this.inputForm.controls['inputControl'].value).subscribe(el => console.log("Wiki", el))
  }

  public createArr(text: string): string[] {
    return text.split(" ")
  }

}
