import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { NoteService } from './note.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNoteComponent } from './add-note/add-note.component';
import { EditNoteComponent } from './edit-note/edit-note.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public notes: Note[] = [];
  
  constructor(private noteService: NoteService, private modalService: NgbModal){}

  ngOnInit() {
      this.getNotes();
  }

  public openAddNoteModal() {
    this.modalService.open(AddNoteComponent).componentInstance.noteAdded.subscribe(() => {
      this.getNotes();
    });
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

  public openEditNoteModal(note: Note): void {
    const modalRef = this.modalService.open(EditNoteComponent)
    modalRef.componentInstance.editNote = note;
    modalRef.componentInstance.noteUpdated.subscribe(() => {
      this.getNotes();
    })
  }
}
