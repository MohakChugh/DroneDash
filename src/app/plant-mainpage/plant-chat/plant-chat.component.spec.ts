import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantChatComponent } from './plant-chat.component';

describe('PlantChatComponent', () => {
  let component: PlantChatComponent;
  let fixture: ComponentFixture<PlantChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
