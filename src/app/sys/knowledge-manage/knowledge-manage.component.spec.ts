import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeManageComponent } from './knowledge-manage.component';

describe('KnowledgeManageComponent', () => {
  let component: KnowledgeManageComponent;
  let fixture: ComponentFixture<KnowledgeManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
