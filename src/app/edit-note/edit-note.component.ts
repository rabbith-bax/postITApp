import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() noteUpdated = new EventEmitter();

  constructor(private noteService: NoteService, public activeModal: NgbActiveModal){}

  public onUpdateNote(note: Note): void {
    document.getElementById("close-edit-modal")?.click();
    this.noteService.updateNote(note).subscribe(
      (response: Note) => {
        console.log(response);
        this.noteUpdated.emit();
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
        this.noteUpdated.emit();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }
}
