
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule, MatFormFieldModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import { ToinenOminaisuusComponent } from './toinen-ominaisuus/toinen-ominaisuus.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';




@NgModule({
  declarations: [AppComponent, ToinenOminaisuusComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    GraphQLModule,
    HttpClientModule,
    InfiniteScrollModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
