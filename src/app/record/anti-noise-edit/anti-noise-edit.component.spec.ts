import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiNoiseEditComponent } from './anti-noise-edit.component';

describe('AntiNoiseEditComponent', () => {
  let component: AntiNoiseEditComponent;
  let fixture: ComponentFixture<AntiNoiseEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntiNoiseEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntiNoiseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
