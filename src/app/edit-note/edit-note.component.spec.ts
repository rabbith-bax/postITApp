import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditNoteComponent } from './edit-note.component';
import { NoteService } from '../note.service';
import { Note } from '../note';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('EditNoteComponent', () => {
  let component: EditNoteComponent;
  let fixture: ComponentFixture<EditNoteComponent>;
  let noteService: NoteService;
  let activeModal: NgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNoteComponent ],
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [ NoteService, NgbActiveModal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNoteComponent);
    component = fixture.componentInstance;
    noteService = TestBed.inject(NoteService);
    activeModal = TestBed.inject(NgbActiveModal);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should  update a note and emit noteUpdated', () => {
    const note: Note = { id: 1, content: 'At first I was afraid' };
    spyOn(noteService, 'updateNote').and.returnValue(of(note));
    spyOn(component.noteUpdated, 'emit');
    component.onUpdateNote(note);
    expect(noteService.updateNote).toHaveBeenCalledWith(note);
    expect(component.noteUpdated.emit).toHaveBeenCalled();
  });

  it('should show an error alert on updateNote error', () => {
    const note: Note = { id: 1, content: 'At first I was afraid' };
    spyOn(noteService, 'updateNote').and.returnValue(throwError({ message: 'Error' }));
    spyOn(window, 'alert');
    component.onUpdateNote(note);
    expect(noteService.updateNote).toHaveBeenCalledWith(note);
    expect(window.alert).toHaveBeenCalledWith('Error');
  });

  it('should emit noteUpdated event on successful deleteNote', () => {
    const noteId = 1;
    spyOn(component.noteUpdated, 'emit');
    component.onDeleteNote(noteId);
    expect(noteService.deleteNote).toHaveBeenCalledWith(noteId);
    expect(component.noteUpdated.emit).toHaveBeenCalled();
  });

  it('should show an error alert on deleteNote error', () => {
    const noteId = 1;
    spyOn(noteService, 'deleteNote').and.returnValue(throwError({ message: 'Error' }));
    spyOn(window, 'alert');
    component.onDeleteNote(noteId);
    expect(noteService.deleteNote).toHaveBeenCalledWith(noteId);
    expect(window.alert).toHaveBeenCalledWith('Error');
  });
});
