import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NoteService } from '../note.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Note } from '../note';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})

export class AddNoteComponent {
  @Output() noteAdded = new EventEmitter();
  constructor(private noteService: NoteService, public activeModal: NgbActiveModal){}

  public onAddNote(addForm: NgForm): void {
    document.getElementById("close-add-modal")?.click();
    this.noteService.addNote(addForm.value).subscribe(
      (response: Note) => {
        console.log(response);
        addForm.reset();
        this.noteAdded.emit();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        addForm.reset();
      }
    );
  }
}
