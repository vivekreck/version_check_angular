import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserDetailsComponent } from './browser-details.component';

describe('BrowserDetailsComponent', () => {
  let component: BrowserDetailsComponent;
  let fixture: ComponentFixture<BrowserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowserDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
