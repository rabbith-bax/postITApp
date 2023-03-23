import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddNoteComponent } from './add-note/add-note.component';
import { EditNoteComponent } from './edit-note/edit-note.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNoteComponent,
    EditNoteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule, NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
