import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformingFacilitiesEditComponent } from './informing-facilities-edit.component';

describe('InformingFacilitiesEditComponent', () => {
  let component: InformingFacilitiesEditComponent;
  let fixture: ComponentFixture<InformingFacilitiesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformingFacilitiesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformingFacilitiesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
