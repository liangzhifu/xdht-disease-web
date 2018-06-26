import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeHistoryComponent } from './knowledge-history.component';

describe('KnowledgeHistoryComponent', () => {
  let component: KnowledgeHistoryComponent;
  let fixture: ComponentFixture<KnowledgeHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
