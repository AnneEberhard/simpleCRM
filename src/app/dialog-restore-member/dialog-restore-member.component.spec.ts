import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRestoreMemberComponent } from './dialog-restore-member.component';

describe('DialogRestoreMemberComponent', () => {
  let component: DialogRestoreMemberComponent;
  let fixture: ComponentFixture<DialogRestoreMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogRestoreMemberComponent]
    });
    fixture = TestBed.createComponent(DialogRestoreMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
