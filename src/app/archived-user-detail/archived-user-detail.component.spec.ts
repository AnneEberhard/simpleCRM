import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedUserDetailComponent } from './archived-user-detail.component';

describe('ArchivedUserDetailComponent', () => {
  let component: ArchivedUserDetailComponent;
  let fixture: ComponentFixture<ArchivedUserDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivedUserDetailComponent]
    });
    fixture = TestBed.createComponent(ArchivedUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
