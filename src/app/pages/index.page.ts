import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';

import PostAttributes from '../post-attributes';

export interface SocialAttributes {
  icon: string;
  link: string;
}

@Component({
  selector: 'app-blog',
  imports: [RouterLink],

  styles: `

    .bg-warning {
background-color: #cf6c84;
background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c45c71' fill-opacity='0.99' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
    }

    .bg-profile {
background-color: #fafaff;
background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    }

  `,

  template: `

    <!--
    <div class="bg-warning text-center absolute top-0 w-[100%] text-white font-bold text-shadow-md/30 p-1">Under Construction</div>
    <div class="size-8"></div>
    -->

    <div class="w-[fit-content] mx-auto">
      <div class="p-3 bg-white rounded-xl border-2 border-black shadow-sm/20 shrink-0 bg-profile">
        <img class="size-28 border-2 border-black rounded-md shadow-sm/20" src="profile.jpg"/>
      </div>
      <h2 class="text-3xl mt-2 mb-3 py-1  text-center font-bold text-shadow-xs/20">Dekirisu</h2>
    </div>

     <div class="gap-2 flex justify-center">
      @for (post of socials; track post.attributes.link) {
        <a href={{post.attributes.link}} class="bg-[#fdfdff] inline-block  rounded-2xl hover:rounded-3xl p-2 border-2 border-black shadow-sm/30 hover:invert hover:scale-130 transition-all" title="my {{post.attributes.icon.toUpperCase()}}">
          <img src="/socials/{{post.attributes.icon}}.svg" class="size-6">
        </a>
      }
    </div>

    <div class="p-5  max-w-[1200px] border-t-2 border-gray-300 m-auto mt-8 text-left">
      <h3 class="text-2xl font-bold mb-4 bg-black text-white py-2 px-4 inline-block rounded-md shadow-sm/30">Development</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" >
        @for (post of devs; track post.attributes) {
          <div class="h-48 rounded-xl overflow-hidden bg-center shadow-md/30 relative border-2" style="background-image:url({{post.attributes.thumbnail}})" class={{post.attributes.classes}}  >
            
            <div class="bg-white border-2 rounded-md text-black m-2 inline-block px-2 font-bold shadow-sm/30">
              {{post.attributes.title}}
            </div>

            <a class="bg-orange-300 border-2 rounded-md hover:rounded-2xl text-black font-bold block absolute right-2 top-2 p-1 size-7 hover:size-9 hover:right-1 hover:top-1 hover:bg-cyan-200 transition-all shadow-sm/20" href="{{post.attributes.usage[1]}}" title="{{post.attributes.slug}} on {{post.attributes.usage[0].toUpperCase()}}">
                <img class="size-[100%]" src="/socials/{{post.attributes.usage[0]}}.svg"/>
            </a>

            <div class="p-1 gap-1 flex absolute bottom-1 right-1">
              @for (usd of post.attributes.used; track usd) {
                <div class="p-1 bg-white gap-1 rounded-lg border-2 shadow-sm/30">
                  <img src="/software/{{usd}}.svg" class="size-6 inline-block" title="{{usd}}">
                </div>
              }
            </div>

          </div>
        }
      </div>
    </div>


    <div class="p-5  max-w-[1200px] border-t-2 border-gray-300 m-auto mt-8 text-left">
      <h3 class="text-2xl font-bold mb-4 bg-black text-white py-2 px-4 inline-block rounded-md shadow-sm/30">Motion Design</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" >
        @for (post of motions; track post.attributes) {
          <div class="h-48 rounded-xl overflow-hidden bg-center shadow-md/30 relative border-2" style="background-image:url({{post.attributes.thumbnail}})" class={{post.attributes.classes}}  >
            
            <div class="bg-white border-2 rounded-md text-black m-2 inline-block px-2 font-bold shadow-sm/30">
              {{post.attributes.title}}
            </div>

            <a class="bg-orange-300 border-2 rounded-md hover:rounded-2xl text-black font-bold block absolute right-2 top-2 p-1 size-7 hover:size-9 hover:right-1 hover:top-1 hover:bg-cyan-200 transition-all shadow-sm/20" href="{{post.attributes.usage[1]}}" title="{{post.attributes.slug}} on {{post.attributes.usage[0].toUpperCase()}}">
                <img class="size-[100%]" src="/socials/{{post.attributes.usage[0]}}.svg"/>
            </a>

            <div class="p-1 gap-1 flex absolute bottom-1 right-1">
              @for (usd of post.attributes.used; track usd) {
                <div class="p-1 bg-white gap-1 rounded-lg border-2 shadow-sm/30">
                  <img src="/software/{{usd}}.svg" class="size-6 inline-block" title="{{usd}}">
                </div>
              }
            </div>

          </div>
        }
      </div>
    </div>


    <div class="mt-8 p-2 border-t-2 border-gray-300 text-gray-500 text-right max-w-[1200px] mx-auto">
        made with <a href="https://analogjs.org/" class="font-bold text-red-700"><img src="/software/analog.svg" class="size-5 inline-block align-sub"> Analog</a>
        and <a href="https://tailwindcss.com/" class="font-bold text-sky-500"><img src="/software/tailwindcss.svg" class="size-5 inline-block align-sub"> Tailwind</a></div>
  `,
})

export default class BlogComponent {
  readonly socials = injectContentFiles<SocialAttributes>(
    (file) => file.filename.includes('/src/content/socials/')
  );
  readonly motions = injectContentFiles<PostAttributes>(
    (file) => file.filename.includes('src/content/motion/')
  );
  readonly devs = injectContentFiles<PostAttributes>(
    (file) => file.filename.includes('src/content/devs/')
  );
}

