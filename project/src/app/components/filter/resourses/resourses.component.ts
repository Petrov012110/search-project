import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';
import { CheckboxItem } from './checkboxItem';

@Component({
  selector: 'app-resourses',
  templateUrl: './resourses.component.html',
  styleUrls: ['./style/resourses.component.scss']
})
export class ResoursesComponent implements OnInit {

  options = Array<CheckboxItem>();
  toggle = new EventEmitter<string[]>();

  private userRoles = [
    { id: 0, name: `Wiki` },
    { id: 1, name: `Git` },
    { id: 2, name: `Twitch` },
  ];

  public selectedValues: string[] = []

  constructor(
    private _managerService: ManagerService
  ) { }

  ngOnInit(): void {
    this.options = this.userRoles.map(x => new CheckboxItem(x.id, x.name))
  }

  onToggle() {
    const checkedOptions = this.options.filter(x => x.checked);
    this.selectedValues = checkedOptions.map(x => x.value);
    this._managerService.onCheckboxEvent.next(this.selectedValues)
    // console.log(this.selectedValues);
  }




}
