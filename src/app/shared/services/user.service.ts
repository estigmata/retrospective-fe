import { Observable } from 'rxjs/Observable';
import { User } from './../models/user.model';

export class UserService {

  constructor() {
  }

  getUser(): Observable<User> {
    const userId = localStorage['userId'];
    if (!userId) {
      Observable.throw(new Error('User not found!'));
    }
    return Observable.of(new User({ _id: userId }));
  }

  createUser(): Observable<User> {
    if (!localStorage['userId']) {
      let newUserId = '';
      while (newUserId.length < 5) {
        newUserId = Math.random().toString(36).substring(2);
      }

      localStorage.setItem('userId', newUserId);
      return Observable.of(new User({ _id: newUserId }));
    }
  }

}
