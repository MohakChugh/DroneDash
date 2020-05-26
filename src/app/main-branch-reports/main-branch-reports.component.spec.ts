import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBranchReportsComponent } from './main-branch-reports.component';

describe('MainBranchReportsComponent', () => {
  let component: MainBranchReportsComponent;
  let fixture: ComponentFixture<MainBranchReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainBranchReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBranchReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
