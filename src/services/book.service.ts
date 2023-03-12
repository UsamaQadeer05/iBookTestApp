import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private friendData = new BehaviorSubject<any>({});
  currentFriendData = this.friendData.asObservable();

  constructor() {
    // Set the initial value of the BehaviorSubject
    this.friendData.next({});
  }

  // Storing local state to use in other components
  changeFormData(formData: any) {
    this.friendData.next(formData)
  }
}