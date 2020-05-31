import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeedbackTableComponent } from './admin-feedback-table.component';

describe('AdminFeedbackTableComponent', () => {
  let component: AdminFeedbackTableComponent;
  let fixture: ComponentFixture<AdminFeedbackTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFeedbackTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFeedbackTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
