import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';
import { CheckboxItem } from './checkboxItem';

@Component({
  selector: 'app-resourses',
  templateUrl: './resourses.component.html',
  styleUrls: ['./style/resourses.component.scss']
})
export class ResoursesComponent implements OnInit {

  public options = Array<CheckboxItem>();

  @Input()
  public checkboxList!: CheckboxItem[]

  @Output()
  toggle = new EventEmitter<string[]>();

  private checkboxObject = [
    { id: 0, name: `Wiki` },
    { id: 1, name: `Git` },
    { id: 2, name: `Twitch` },
  ];

  public selectedValues: string[] = []

  constructor() {

  }

  public ngOnInit(): void {
    this.options = this.checkboxObject.map(x => new CheckboxItem(x.id, x.name))
  }

  public onToggle() {
    const checkedOptions = this.options.filter(x => x.checked);
    this.selectedValues = checkedOptions.map(x => x.value);
    this.toggle.emit(checkedOptions.map(x => x.value));
  }

}
