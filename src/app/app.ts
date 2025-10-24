import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  @HostBinding('class') classes = '';

  ngOnInit() {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    this.classes = prefersDark ? 'dark-theme' : '';

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        this.classes = e.matches ? 'dark-theme' : '';
      });
  }

  toggleTheme() {
    this.classes = this.classes === 'dark-theme' ? '' : 'dark-theme';
  }
}
