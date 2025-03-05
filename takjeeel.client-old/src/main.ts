import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';

platformBrowserDynamic().bootstrapModule(AppComponent, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
