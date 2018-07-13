import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualNoiseManageComponent } from './individual-noise-manage.component';

describe('IndividualNoiseManageComponent', () => {
  let component: IndividualNoiseManageComponent;
  let fixture: ComponentFixture<IndividualNoiseManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualNoiseManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualNoiseManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
