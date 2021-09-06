import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./style/information.component.scss']
})
export class InformationComponent implements OnInit {

  @Input()
  public contentLength!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
