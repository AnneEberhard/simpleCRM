import {  Component, inject } from '@angular/core';
import {  ViewportScroller } from '@angular/common';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent { private readonly viewport = inject(ViewportScroller)

   
  constructor(public authservice: AuthService) {   }
  
  scrollToTop(): void {
    this.viewport.scrollToPosition([0,0])
  }
}
