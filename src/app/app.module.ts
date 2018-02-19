import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { PlayerComponent } from './player/player.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MainComponent,
    NavbarComponent,
    HomeComponent,
    SearchComponent,
    ListComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
