import {
  Component, Input
} from '@angular/core';

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css'],
  standalone:true
})

export class UserAvatarComponent {
  @Input() dataLetters?: string | null;
}
