import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-star-button',
  templateUrl: './star-button.component.html',
  styleUrl: './star-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.starred]': 'starred()',
    '(click)': 'onHostClick($event)'
  }
})
export class StarButtonComponent {
  starred = input<boolean>(false);
  toggle = output<void>();

  onHostClick(event: Event): void {
    event.stopPropagation();
  }

  onToggle(): void {
    this.toggle.emit();
  }
}

