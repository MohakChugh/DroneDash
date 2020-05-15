import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLivestreamComponent } from './admin-livestream.component';

describe('AdminLivestreamComponent', () => {
  let component: AdminLivestreamComponent;
  let fixture: ComponentFixture<AdminLivestreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLivestreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLivestreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
