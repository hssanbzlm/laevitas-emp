import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarState = new Subject<boolean>();
  constructor() {
    this.sidebarState.next(false);
  }

  getSideBarState() {
    return this.sidebarState.asObservable();
  }
  setSidebarState(state: boolean) {
    this.sidebarState.next(state);
  }
}
