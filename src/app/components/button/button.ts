import {Component, input, output} from '@angular/core';

export enum ButtonSize {
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
  hoverColor = input<string | null>(null);

  click = output();

  protected readonly ButtonSize = ButtonSize;

  handleClick($event: PointerEvent) {
    $event.stopPropagation();
    this.click.emit();
  }
}
