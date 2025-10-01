import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerDash } from './buyer-dash';

describe('BuyerDash', () => {
  let component: BuyerDash;
  let fixture: ComponentFixture<BuyerDash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerDash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerDash);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
