import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentService } from '../../../core/services/content.service';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { RichTextComponent } from '../../components/rich-text/rich-text.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [EventCardComponent, RichTextComponent, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  homePage = this.contentService.homePage;
  stories = this.contentService.events;
  events = [
    { slug: 'abc', id: 0, },
    { slug: 'def', id: 1, },
    { slug: 'ghi', id: 2, },
    { slug: 'jkl', id: 3, },
  ]
  
  constructor(private contentService: ContentService) {}
}
