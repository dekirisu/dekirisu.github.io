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

    <div class="p-5  max-w-[1200px] border-t border-gray-200 m-auto mt-8 text-left">
      <h3 class="text-2xl font-bold mb-4 bg-black text-white py-2 px-4 inline-block rounded-md">Development</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" >
        @for (post of motions; track post.attributes) {
          <div class="h-48 rounded-xl overflow-hidden bg-center shadow-md relative border-2" style="background-image:url({{post.attributes.thumbnail}})" class={{post.attributes.classes}}  >
            <div class="bg-white border-2 rounded-md text-black m-2 inline-block px-2 font-bold">
              <a href="{{post.attributes.usage}}">{{post.attributes.title}}</a>
            </div>

            <div class="p-1 gap-1 flex absolute bottom-1 right-1">
              @for (usd of post.attributes.used; track usd) {
                <div class="p-1 bg-white/85 gap-1 rounded-sm shadow-xl border-2">
                  <img src="/software/{{usd}}.svg" class="size-6 inline-block" title="{{usd}}">
                </div>
              }
            </div>

          </div>
        }
      </div>
    </div>

  `,
})

export default class BlogComponent {
  readonly socials = injectContentFiles<SocialAttributes>(
    (file) => file.filename.includes('/src/content/socials/')
  );
  readonly motions = injectContentFiles<PostAttributes>(
    (file) => file.filename.includes('src/content/motion/')
  );
}
