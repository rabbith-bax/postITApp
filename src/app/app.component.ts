import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { NoteService } from './note.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public notes: Note[] = [];
  public editNote!: Note ;
  
  constructor(private noteService: NoteService){}

  ngOnInit() {
      this.getNotes();
  }

  public getNotes(): void {
    this.noteService.getNotes().subscribe(
      (response: Note[]) => {
        this.notes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddNote(addForm: NgForm): void {
    document.getElementById("close-add-modal")?.click();
    this.noteService.addNote(addForm.value).subscribe(
      (response: Note) => {
        console.log(response);
        this.getNotes();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        addForm.reset();
      }
    );
  }

  public onUpdateNote(note: Note): void {
    document.getElementById("close-edit-modal")?.click();
    this.noteService.updateNote(note).subscribe(
      (response: Note) => {
        console.log(response);
        this.getNotes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onDeleteNote(noteId: number): void {
    document.getElementById("close-edit-modal")?.click();
    this.noteService.deleteNote(noteId).subscribe(
      (response: void) => {
        console.log(response);
        this.getNotes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onOpenEditModal(note: Note): void {
    this.editNote = note;
  }
}
