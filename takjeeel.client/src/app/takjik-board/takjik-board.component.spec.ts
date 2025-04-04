import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakjikBoardComponent } from './takjik-board.component';

describe('TakjikBoardComponent', () => {
  let component: TakjikBoardComponent;
  let fixture: ComponentFixture<TakjikBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TakjikBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakjikBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
