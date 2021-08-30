import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../services/resourses.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  text: string = "";

  constructor(private resours: ResourceService) { }

  ngOnInit(): void {
  }

  public getData(): void {

    console.log(this.text);
    
    this.resours.getTwitchData(this.text).subscribe(el => console.log("Twitch", el));
    this.resours.getGitData(this.text).subscribe(el => console.log("Git", el));
    this.resours.getWikiData(this.text).subscribe(el => console.log("Wiki", el))
  }

  public createArr(text: string): string[] {
    return text.split(" ")
  }

}
