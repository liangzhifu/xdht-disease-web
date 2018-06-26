import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeCatalogManageComponent } from './knowledge-catalog-manage.component';

describe('KnowledgeCatalogManageComponent', () => {
  let component: KnowledgeCatalogManageComponent;
  let fixture: ComponentFixture<KnowledgeCatalogManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeCatalogManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeCatalogManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
