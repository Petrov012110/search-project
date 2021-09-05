import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';
import { CheckboxModel } from '../models/checkbox.model';

@Component({
  selector: 'app-resourses',
  templateUrl: './resourses.component.html',
  styleUrls: ['./style/resourses.component.scss']
})
export class ResoursesComponent implements DoCheck{

  public options = Array<CheckboxModel>();

  public isDisabled: boolean = true;

  @Input()
  public checkboxList!: CheckboxModel[];

  public selectedValues: string[] = [];

  constructor(private _managerService: ManagerService) {

  }

  public ngDoCheck(): void {

  }

  public onToggle(node: CheckboxModel, event: Event) {

    this._managerService.onCheckboxEvent.next(this.checkboxList)
    
  }

 

}
