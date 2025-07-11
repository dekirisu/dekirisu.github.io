import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';

import PostAttributes from '../../post-attributes';

export interface SocialAttributes {
  icon: string;
  link: string;
}

@Component({
  selector: 'app-blog',
  imports: [RouterLink],
  template: `
    
    <div class="w-[fit-content] mx-auto">
      <div class="p-3 bg-white rounded-xl border border-black/25 shadow-md shrink-0">
        <img class="size-28 border-2 border-black rounded-md" src="profile.jpg"/>
      </div>
      <h2 class="text-3xl mt-3 mb-2 py-1 bg-white border border-black/5 text-center font-bold">Dekirisu</h2>
    </div>

     <div class="gap-2 flex justify-center">
      @for (post of socials; track post.attributes.link) {
        <a href={{post.attributes.link}} class="inline-block bg-white rounded-full p-2 border border-black/25 shadow-md">
          <img src="/socials/{{post.attributes.icon}}" class="size-6">
        </a>
      }
    </div>


  `,
})

export default class BlogComponent {
  readonly socials = injectContentFiles<SocialAttributes>(
    (file) => file.filename.includes('/src/content/socials/')
  );
}
