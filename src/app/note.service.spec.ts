import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoteService } from './note.service';
import { Note } from './note';

describe('NoteService', () => {
  let service: NoteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NoteService]
    });
    service = TestBed.inject(NoteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getNotes', () => {
    it('should return an Observable<Note[]>', () => {
      const mockNotes: Note[] = [
        { id: 1, content: 'Lorem ipsum' },
        { id: 2, content: 'Dolor sit amet' }
      ];

      service.getNotes().subscribe(notes => {
        expect(notes.length).toBe(2);
        expect(notes).toEqual(mockNotes);
      });

      const req = httpMock.expectOne(`${service['apiServerUrl']}/note/all`);
      expect(req.request.method).toBe('GET');
      req.flush(mockNotes);
    });
  });

  describe('addNote', () => {
    it('should return an Observable<Note>', () => {
      const mockNote: Note = { id: 1, content: 'Lorem ipsum' };

      service.addNote(mockNote).subscribe(note => {
        expect(note).toEqual(mockNote);
      });
      
      const req = httpMock.expectOne(`${service['apiServerUrl']}/note/add`);
      expect(req.request.method).toBe('POST');
      req.flush(mockNote);
    });
  });

  describe('updateNote', () => {
    it('should return an Observable<Note>', () => {
      const mockNote: Note = { id: 1, content: 'Lorem ipsum' };

      service.updateNote(mockNote).subscribe(note => {
        expect(note).toEqual(mockNote);
      });

      const req = httpMock.expectOne(`${service['apiServerUrl']}/note/update`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockNote);
    });
  });

  describe('deleteNote', () => {
    it('should return an Observable<void>', () => {
      const mockNoteId = 1;

      service.deleteNote(mockNoteId).subscribe(() => {
        expect().nothing();
      });

      const req = httpMock.expectOne(`${service['apiServerUrl']}/note/delete/${mockNoteId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
