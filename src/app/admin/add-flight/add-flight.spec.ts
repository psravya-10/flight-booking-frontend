import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddFlight } from './add-flight';

describe('AddFlight', () => {
  let component: AdminAddFlight;
  let fixture: ComponentFixture<AdminAddFlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddFlight]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddFlight);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
