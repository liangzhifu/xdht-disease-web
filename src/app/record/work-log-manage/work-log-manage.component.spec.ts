import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLogManageComponent } from './work-log-manage.component';

describe('WorkLogManageComponent', () => {
  let component: WorkLogManageComponent;
  let fixture: ComponentFixture<WorkLogManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkLogManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkLogManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
