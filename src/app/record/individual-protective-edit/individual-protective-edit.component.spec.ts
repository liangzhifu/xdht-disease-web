import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualProtectiveEditComponent } from './individual-protective-edit.component';

describe('IndividualProtectiveEditComponent', () => {
  let component: IndividualProtectiveEditComponent;
  let fixture: ComponentFixture<IndividualProtectiveEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualProtectiveEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualProtectiveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
