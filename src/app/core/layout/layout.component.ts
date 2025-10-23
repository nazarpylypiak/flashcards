import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TopBarComponent } from '../../shared/containers/top-bar/top-bar.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, TopBarComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle('FlashCards App');
  }
}
