import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoadingService } from './../loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  loading: boolean = false;
  loading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loading$ = this.loadingService.loadingSubject.pipe(
      delay(0)
    )
  }
}
