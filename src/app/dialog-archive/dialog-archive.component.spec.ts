import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogArchiveComponent } from './dialog-archive.component';

describe('DialogArchiveComponent', () => {
  let component: DialogArchiveComponent;
  let fixture: ComponentFixture<DialogArchiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogArchiveComponent]
    });
    fixture = TestBed.createComponent(DialogArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
