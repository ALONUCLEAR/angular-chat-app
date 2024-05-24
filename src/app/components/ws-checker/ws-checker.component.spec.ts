import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsCheckerComponent } from './ws-checker.component';

describe('WsCheckerComponent', () => {
  let component: WsCheckerComponent;
  let fixture: ComponentFixture<WsCheckerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WsCheckerComponent]
    });
    fixture = TestBed.createComponent(WsCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});