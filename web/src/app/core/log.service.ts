import { CoreModule } from './core.module';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: CoreModule
})
export class LogService {

  constructor() { }
}
