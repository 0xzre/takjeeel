import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakjilBoardComponent } from './takjil-board.component';

describe('TakjilBoardComponent', () => {
  let component: TakjilBoardComponent;
  let fixture: ComponentFixture<TakjilBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TakjilBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakjilBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
