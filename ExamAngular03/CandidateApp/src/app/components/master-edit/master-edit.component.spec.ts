import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterEditComponent } from './master-edit.component';

describe('MasterEditComponent', () => {
  let component: MasterEditComponent;
  let fixture: ComponentFixture<MasterEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterEditComponent]
    });
    fixture = TestBed.createComponent(MasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
