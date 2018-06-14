import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOfficeManageComponent } from './company-office-manage.component';

describe('CompanyOfficeManageComponent', () => {
  let component: CompanyOfficeManageComponent;
  let fixture: ComponentFixture<CompanyOfficeManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyOfficeManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyOfficeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
