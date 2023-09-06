import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedInfoComponent } from './shared-info.component';

describe('SharedInfoComponent', () => {
  let component: SharedInfoComponent;
  let fixture: ComponentFixture<SharedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
