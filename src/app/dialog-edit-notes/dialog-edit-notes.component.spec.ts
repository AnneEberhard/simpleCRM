import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditNotesComponent } from './dialog-edit-notes.component';

describe('DialogEditNotesComponent', () => {
  let component: DialogEditNotesComponent;
  let fixture: ComponentFixture<DialogEditNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditNotesComponent]
    });
    fixture = TestBed.createComponent(DialogEditNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
