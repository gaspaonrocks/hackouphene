/*** IMPORT FOR ANGULAR ***/
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

/*** IMPORT THE CONFIG FILES ***/
import { AppRoutingModule } from "./config/routes";

/** IMPORT THE COMPONENTS ***/
import { AppComponent } from "./app.component";
import { TestComponent } from "./components/test/test.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MainComponent } from "./components/main/main.component";
import { HomeComponent } from "./components/home/home.component";
import { SearchComponent } from "./components/search/search.component";
import { ListComponent } from "./components/list/list.component";
import { PlayerComponent } from "./components/player/player.component";
import { NotFoundComponent } from "./components/notfound/notfound.component";

/*** IMPORT FOR MATERIAL DESIGN ***/
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatGridListModule } from "@angular/material/grid-list";

/*** IMPORT FLEX LAYOUT FOR RESPONSIVE MADNESS ***/
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MainComponent,
    NavbarComponent,
    HomeComponent,
    SearchComponent,
    ListComponent,
    PlayerComponent,
    NotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatGridListModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}