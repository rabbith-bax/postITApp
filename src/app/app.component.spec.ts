import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { Note } from './note';
import { NoteService } from './note.service';
import { AddNoteComponent } from './add-note/add-note.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let noteService: NoteService;
  let modalService: NgbModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [NoteService, NgbModal, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    noteService = TestBed.inject(NoteService);
    modalService = TestBed.inject(NgbModal);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call NoteService to get notes on init', () => {
    const spy = spyOn(noteService, 'getNotes').and.callThrough();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.notes.length).toBeGreaterThan(0);
  });

  it('should open AddNoteComponent on add note', () => {
    const spy = spyOn(modalService, 'open').and.callThrough();

    component.openAddNoteModal();

    expect(spy).toHaveBeenCalledWith(AddNoteComponent);
  });

  it('should open EditNoteComponent on edit note', () => {
    const note: Note = { id: 1, content: 'This is a test note' };
    const spy = spyOn(modalService, 'open').and.callThrough();

    component.openEditNoteModal(note);

    expect(spy).toHaveBeenCalledWith(EditNoteComponent);
  });
});
