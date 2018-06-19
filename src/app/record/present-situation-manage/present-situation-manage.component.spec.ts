import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentSituationManageComponent } from './present-situation-manage.component';

describe('PresentSituationManageComponent', () => {
  let component: PresentSituationManageComponent;
  let fixture: ComponentFixture<PresentSituationManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentSituationManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentSituationManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
