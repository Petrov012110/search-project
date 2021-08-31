import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./style/content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private _storage: LocalStorageService) { }

  history: object[] = [];
  historySub!: Subscription;

  public ngOnInit(): void {
    
      
  }


  

}
