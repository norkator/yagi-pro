import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {DetailsFormComponent} from './details-form/details-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatSliderModule} from "@angular/material/slider";

@NgModule({
  declarations: [
    AppComponent,
    DetailsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSliderModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
