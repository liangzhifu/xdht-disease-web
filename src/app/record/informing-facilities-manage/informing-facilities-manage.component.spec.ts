import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformingFacilitiesManageComponent } from './informing-facilities-manage.component';

describe('InformingFacilitiesManageComponent', () => {
  let component: InformingFacilitiesManageComponent;
  let fixture: ComponentFixture<InformingFacilitiesManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformingFacilitiesManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformingFacilitiesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
