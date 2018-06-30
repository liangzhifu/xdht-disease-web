import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemNoticeManageComponent } from './system-notice-manage.component';

describe('SystemNoticeManageComponent', () => {
  let component: SystemNoticeManageComponent;
  let fixture: ComponentFixture<SystemNoticeManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemNoticeManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemNoticeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
