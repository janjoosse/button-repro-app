import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, signal } from '@angular/core';
import { ContentService } from '../../../core/services/content.service';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { RichTextComponent } from '../../components/rich-text/rich-text.component';
import { RouterLink } from '@angular/router';
import { HomePage } from '../../../core/models/home-page';
import { Story } from '../../../core/models/story';
import { Event } from '../../../core/models/event';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [EventCardComponent, RichTextComponent, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  homePage?: HomePage;
  stories?: Story<Event>[];
  events = signal([
    { slug: 'abc', id: 0, },
    { slug: 'def', id: 1, },
    { slug: 'ghi', id: 2, },
    { slug: 'jkl', id: 3, },
  ]);
  
  constructor(private contentService: ContentService) {}
  
  ngOnInit(): void {
    console.log('ngOnInit homepage');
    this.homePage = this.contentService.homePage();
    this.stories = this.contentService.events();
  }
}
