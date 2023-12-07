import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartUserLevelComponent } from './chart-user-level.component';

describe('ChartUserLevelComponent', () => {
  let component: ChartUserLevelComponent;
  let fixture: ComponentFixture<ChartUserLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartUserLevelComponent]
    });
    fixture = TestBed.createComponent(ChartUserLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
