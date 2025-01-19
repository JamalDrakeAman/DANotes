import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { Firestore, collectionData, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NoteListService {


  normalNotes: Note[] = [];
  trashNotes: Note[] = [];
 

  unsubTrash;
  unsubNotes;


  firestore: Firestore = inject(Firestore);


  constructor() {
    // onSnapshot variante daten zu holen Liste
    this.unsubTrash = this.subTrashList();
    this.unsubNotes = this.subNotesList();
  }


  ngOnDestroy() {
    this.unsubNotes();
    this.unsubTrash();
  }


  subNotesList() {
    return onSnapshot(this.getNotesRef(), (list) => {
      this.normalNotes = [];
      list.forEach(element => {
        console.log(this.setNoteObject(element.data(), element.id));
        this.normalNotes.push(this.setNoteObject(element.data(), element.id));
      });
    });
  }


  subTrashList() {
    return onSnapshot(this.getTrashRef(), (list) => {
      this.trashNotes = [];
      list.forEach(element => {
        this.trashNotes.push(this.setNoteObject(element.data(), element.id));
      });
    });

  }




  setNoteObject(obj: any, id: string): Note {
    return {
      id: id,
      type: obj.type || 'note',
      title: obj.title || '',
      content: obj.content || '',
      marked: obj.marked || false
    }
  }


  getNotesRef() {
    return collection(this.firestore, 'notes');
  }

  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getsingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }


}
