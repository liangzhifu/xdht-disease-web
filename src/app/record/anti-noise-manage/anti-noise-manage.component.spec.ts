import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiNoiseManageComponent } from './anti-noise-manage.component';

describe('AntiNoiseManageComponent', () => {
  let component: AntiNoiseManageComponent;
  let fixture: ComponentFixture<AntiNoiseManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntiNoiseManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntiNoiseManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
