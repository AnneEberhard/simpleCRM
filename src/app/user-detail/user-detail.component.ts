import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{

  activeId!: string;

  constructor( public firebaseservice: FirebaseService, private route: ActivatedRoute) {  }
  
  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      const lastSegment = segments[segments.length - 1];
      this.activeId = lastSegment.toString();
      console.log('activeId:', this.activeId);
    });

}
}