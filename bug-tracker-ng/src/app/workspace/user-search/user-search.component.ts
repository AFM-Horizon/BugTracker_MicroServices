import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from './../../models/user';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  users$: Observable<User[]>

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.users$ = fromEvent(document.getElementById('search'), 'keyup')
    .pipe(
      map((event) => {
        var element = event.target as HTMLInputElement
        return element.value;
      }),
      debounceTime(200),
      distinctUntilChanged(),
      mergeMap((value) => {
        const filteredVal = value.replace(/[^0-9a-z]/gi, '');
        if (filteredVal && filteredVal.trim().length !== 0) {
          return this.http.get<User[]>(`http://localhost:3002/auth/search/${value}`)
        }
        return of([]);
      })
    );
  }
}
