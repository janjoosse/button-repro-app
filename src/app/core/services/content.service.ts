import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { HomePage } from '../models/home-page';
import { Event } from '../models/event';
import { Story } from '../models/story';
import { ContactItem } from '../models/contact-item';
import { AboutPage } from '../models/about-page';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private storyblokBaseUrl = 'https://api.storyblok.com/v2/cdn';
  private token = 'token=acu9a7B7tQrUQ6dr0rQTqgtt';

  homePage?: HomePage;
  aboutPage?: AboutPage;
  events?: Story<Event>[];
  contactList?: Story<ContactItem>[];
  contactListTypes = ['name','kvk','bankaccount','email','address'];

  constructor(private http: HttpClient) { }

  loadData(): void {
    this.http
      .get<{ story: Story<HomePage> }>(`${this.storyblokBaseUrl}/stories/home?${this.token}`)
      .subscribe((homePage) => this.homePage = homePage.story.content);

    this.http
      .get<{ stories: Story<Event>[] }>(`${this.storyblokBaseUrl}/stories?content_type=Event&sort_by=content.date:asc&filter_query[date][gt_date]=${new Date().toISOString().split('T')[0]}&${this.token}`)
      .subscribe(response => this.events = response.stories);

    this.http
      .get<{ stories: Story<ContactItem>[] }>(`${this.storyblokBaseUrl}/stories?content_type=ContactItem&${this.token}`)
      .subscribe(response => this.contactList = response.stories.sort((a,b) => this.contactListTypes.indexOf(a.content.type) - this.contactListTypes.indexOf(b.content.type)));

    this.http
      .get<{ story: Story<AboutPage> }>(`${this.storyblokBaseUrl}/stories/about?${this.token}`)
      .subscribe(response => this.aboutPage = response.story.content);
  }

  getEvent(slug: string): Event {
    if (this.events!.findIndex(e => e.slug === slug) === -1) {
      this.loadEvent(slug);
    }
    return this.events!.find(e => e.slug === slug)?.content!;
  }

  loadEvent(slug: string): void {
    this.http
      .get<{ story: Story<Event> }>(`${this.storyblokBaseUrl}/stories/${slug}?${this.token}`)
      .subscribe(response => this.events = this.events?.concat(response.story));
  }
}
