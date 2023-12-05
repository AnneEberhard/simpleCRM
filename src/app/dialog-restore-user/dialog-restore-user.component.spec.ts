import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRestoreUserComponent } from './dialog-restore-user.component';

describe('DialogRestoreUserComponent', () => {
  let component: DialogRestoreUserComponent;
  let fixture: ComponentFixture<DialogRestoreUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogRestoreUserComponent]
    });
    fixture = TestBed.createComponent(DialogRestoreUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
