import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./components/takjil-board/takjil-board.component').then((m) => m.TakjilBoardComponent);
    },
  },
];