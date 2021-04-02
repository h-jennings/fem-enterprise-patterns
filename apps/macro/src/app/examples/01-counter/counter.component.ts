import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs/index';
import { map, scan, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-counter',
  styles: [
    `
      mat-card {
        width: 400px;
        box-sizing: border-box;
        margin: 16px;
      }

      .card-container {
        display: flex;
        flex-flow: row wrap;
      }
    `,
  ],
  template: `
    <div class="card-container">
      <mat-card>
        <div>
          <h2>Activate Beast Mode!</h2>
          <button #btn mat-raised-button color="accent">Click me!</button>
        </div>
      </mat-card>
      <mat-card>
        <div>
          <h2>Beast Mode Activated</h2>
          <strong>{{ count }} times!</strong>
        </div>
      </mat-card>
    </div>
  `,
})
export class CounterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('btn') btn;
  count = 0;
  subscription: Subscription;

  ngAfterViewInit() {
    // -------------------------------------------------------------------
    // CHALLENGE: Go Beast Mode By 1!
    // -------------------------------------------------------------------
    // Capture the btn click and increment count by 1
    // -------------------------------------------------------------------
    this.subscription = fromEvent(this.getNativeElement(this.btn), 'click')
      .pipe(
        map(() => 1),
        scan((acc, curr) => acc + curr),
        tap((count) => (this.count = count))
      )
      .subscribe();
  }

  getNativeElement(element) {
    return element._elementRef.nativeElement;
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
