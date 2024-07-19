import { CommonModule } from '@angular/common';
import { Component,Input  } from '@angular/core';

@Component({
  selector: 'app-tille',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './tille.component.html',
  styleUrl: './tille.component.scss'
})
export class TilleComponent {
  @Input() content: string ='';
  @Input() title: string = '';
}
