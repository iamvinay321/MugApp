import { Directive, HostListener, Input, OnInit } from '@angular/core';
declare var $: any;

@Directive({
  selector: '[scrollTo]'
})
export class ScrollToDirective implements OnInit {

  @Input('scrollTo') scrollTo: string;
  @Input('scrollBoxID') scrollBoxID: string;

  constructor() { }

  ngOnInit(): void {

  }

  @HostListener('mousedown')
  onMouseClick() {
    debugger
    var id = this.scrollTo;
    var scrollBoxID = this.scrollBoxID;
    var elementOffset = $(scrollBoxID).offset().top + 10;

    $(scrollBoxID).animate({
      scrollTop: $(scrollBoxID).scrollTop() + ($(id).offset().top - elementOffset)
    }, 1000);
  }
}
