import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProuctDetailsComponent } from './prouct-details.component';

describe('ProuctDetailsComponent', () => {
  let component: ProuctDetailsComponent;
  let fixture: ComponentFixture<ProuctDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProuctDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProuctDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
