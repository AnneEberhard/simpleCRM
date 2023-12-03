import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditLevelComponent } from './dialog-edit-level.component';

describe('DialogEditLevelComponent', () => {
  let component: DialogEditLevelComponent;
  let fixture: ComponentFixture<DialogEditLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditLevelComponent]
    });
    fixture = TestBed.createComponent(DialogEditLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
