import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appSummaryFocus]'
})
export class SummaryDirective implements OnInit {
    constructor(private element: ElementRef) { }

    ngOnInit() {
      this.element.nativeElement.focus();
    }
}
