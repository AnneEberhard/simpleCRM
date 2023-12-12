import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  constructor(public authservice: AuthService) {   }

}
