import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HistoryComponent } from './history/history.component';
import { FilterComponent } from './filter/filter.component';
import { SearchComponent } from './search/search.component';
import { ContentComponent } from './content/content.component';
import { ResoursesComponent } from './filter/resourses/resourses.component';
import { InformationComponent } from './filter/information/information.component';
import { SortingComponent } from './filter/sorting/sorting.component';
import { ResourceService } from './services/resourses.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    FilterComponent,
    SearchComponent,
    ContentComponent,
    ResoursesComponent,
    InformationComponent,
    SortingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ResourceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
