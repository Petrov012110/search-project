import { Component, OnInit } from '@angular/core';
import { CheckboxItem } from './checkboxItem';

@Component({
  selector: 'app-resourses',
  templateUrl: './resourses.component.html',
  styleUrls: ['./style/resourses.component.scss']
})
export class ResoursesComponent implements OnInit {

  private userRoles = [
    { id: 1, name: `Wiki` },
    { id: 2, name: `Git` },
    { id: 3, name: `Twitch` },
  ];

  public userRolesOptions = new Array<CheckboxItem>();

  constructor() { }

  ngOnInit(): void {
    this.userRolesOptions = this.userRoles.map(x => new CheckboxItem(x.id, x.name))
  }

}