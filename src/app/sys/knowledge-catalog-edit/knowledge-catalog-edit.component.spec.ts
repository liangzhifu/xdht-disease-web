import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeCatalogEditComponent } from './knowledge-catalog-edit.component';

describe('KnowledgeCatalogEditComponent', () => {
  let component: KnowledgeCatalogEditComponent;
  let fixture: ComponentFixture<KnowledgeCatalogEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeCatalogEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeCatalogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
