import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNoteComponent } from './add-note.component';
import { NoteService } from '../note.service';
import { of, throwError } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddNoteComponent', () => {
  let component: AddNoteComponent;
  let fixture: ComponentFixture<AddNoteComponent>;
  let noteService: NoteService;
  let activeModal: NgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNoteComponent ],
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [ NoteService, NgbActiveModal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoteComponent);
    component = fixture.componentInstance;
    noteService = TestBed.inject(NoteService);
    activeModal = TestBed.inject(NgbActiveModal);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a note and emit noteAdded', () => {
    const addForm: NgForm = { value: { id: 1, content: 'At first I was afraid' }};
    spyOn(noteService, 'updateNote').and.returnValue(of(addForm.value));
    spyOn(component.noteAdded, 'emit');
    component.onAddNote(addForm.value);
    expect(noteService.updateNote).toHaveBeenCalledWith(addForm.value);
    expect(component.noteAdded.emit).toHaveBeenCalled();
  });

  it('should show an error alert when adding a note', () => {
    const addForm: NgForm = { value: { id: 1, content: 'At first I was afraid' }};
    spyOn(noteService, 'addNote').and.returnValue(throwError({ message: 'Error' }));
    spyOn(window, 'alert');
    component.onAddNote(addForm.value);
    expect(noteService.updateNote).toHaveBeenCalledWith(addForm.value);
    expect(window.alert).toHaveBeenCalledWith('Error');
  });
});

