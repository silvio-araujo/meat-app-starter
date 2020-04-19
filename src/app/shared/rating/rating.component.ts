import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  @Output() rated = new EventEmitter<number>()
  @Output() passingBy = new EventEmitter<number>()
  @Output() leftRated = new EventEmitter<number>()
  @Output() leftUnrated = new EventEmitter<number>()

  rate: number = 0
  rates: number[] = [1,2,3,4,5]
  private previousRate: number

  constructor() { }

  ngOnInit() {
  }

  setRate(rate: number) {
    this.rate = rate
    this.previousRate = undefined
    this.rated.emit(this.rate)
  }

  setTemporaryRate(rate: number) {
    if (this.previousRate === undefined) {
      this.previousRate = this.rate
    }

    this.passingBy.emit(this.rate)
    this.rate = rate
  }

  clearTemporaryRate() {
    var lastRate: number = this.rate

    if (this.previousRate !== undefined) {
      this.rate = this.previousRate
      this.previousRate = undefined
    }

    if (this.rate > 0) {
      this.leftRated.emit(lastRate)
    } else {
      this.leftUnrated.emit(lastRate)
    }
  }
}
