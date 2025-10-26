import {Component, effect, input, output} from '@angular/core';

enum ButtonSize {
  BIG,
  SMALL
}

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  host: {
    '[style.--icon-url]': 'icon()',
    '[style.--background-color]': 'backgroundColor()',
    '[style.--hoverColor]': 'hoverColor()',
  }
})
export class Button {
  title = input.required<string>();

  size = input<ButtonSize>(ButtonSize.BIG)
  icon = input<string | null>(null);
  backgroundColor = input<string | null>(null);
  qqsdf = effect(() => console.log('Background color changed to:', this.backgroundColor()));
  hoverColor = input<string | null>(null);

  click = output();

  protected readonly ButtonSize = ButtonSize;
}
