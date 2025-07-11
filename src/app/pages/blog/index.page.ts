import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';

import PostAttributes from '../../post-attributes';

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

  `,
})

export default class BlogComponent {
  readonly posts = injectContentFiles<PostAttributes>();
}
