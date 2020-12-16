import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  trackById(_: number, item: any) {
    return item.id
  }
}
