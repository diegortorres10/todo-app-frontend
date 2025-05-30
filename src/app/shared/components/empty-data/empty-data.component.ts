import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-data',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './empty-data.component.html',
  styleUrl: './empty-data.component.scss',
})
export class EmptyDataComponent {}
