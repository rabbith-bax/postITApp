import { Component, Input } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent {
  @Input()
  editNote!: Note;

  constructor(private noteService: NoteService, public activeModal: NgbActiveModal){}

  public onUpdateNote(note: Note): void {
    document.getElementById("close-edit-modal")?.click();
    this.noteService.updateNote(note).subscribe(
      (response: Note) => {
        console.log(response);
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
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }
}
