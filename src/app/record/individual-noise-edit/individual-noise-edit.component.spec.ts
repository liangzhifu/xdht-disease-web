import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualNoiseEditComponent } from './individual-noise-edit.component';

describe('IndividualNoiseEditComponent', () => {
  let component: IndividualNoiseEditComponent;
  let fixture: ComponentFixture<IndividualNoiseEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualNoiseEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualNoiseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
