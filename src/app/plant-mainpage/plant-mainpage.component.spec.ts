import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantMainpageComponent } from './plant-mainpage.component';

describe('PlantMainpageComponent', () => {
  let component: PlantMainpageComponent;
  let fixture: ComponentFixture<PlantMainpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantMainpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
