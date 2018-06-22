import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOfficeChooseComponent } from './company-office-choose.component';

describe('CompanyOfficeChooseComponent', () => {
  let component: CompanyOfficeChooseComponent;
  let fixture: ComponentFixture<CompanyOfficeChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyOfficeChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyOfficeChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
