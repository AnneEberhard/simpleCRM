import {  Component, inject } from '@angular/core';
import {  ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent { private readonly viewport = inject(ViewportScroller)
  scrollToTop(): void {
    this.viewport.scrollToPosition([0,0])
  }
}
