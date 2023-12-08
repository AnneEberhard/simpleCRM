import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditMemberComponent } from './dialog-edit-member.component';

describe('DialogEditMemberComponent', () => {
  let component: DialogEditMemberComponent;
  let fixture: ComponentFixture<DialogEditMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditMemberComponent]
    });
    fixture = TestBed.createComponent(DialogEditMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
