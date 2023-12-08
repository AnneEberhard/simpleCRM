import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedMemberDetailComponent } from './archived-member-detail.component';

describe('ArchivedMemberDetailComponent', () => {
  let component: ArchivedMemberDetailComponent;
  let fixture: ComponentFixture<ArchivedMemberDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivedMemberDetailComponent]
    });
    fixture = TestBed.createComponent(ArchivedMemberDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
