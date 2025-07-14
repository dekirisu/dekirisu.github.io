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

  template: `

    <!--
    <div class="bg-warning text-center absolute top-0 w-[100%] text-white font-bold text-shadow-md/30 p-1">Under Construction</div>
    <div class="size-8"></div>
    -->

    <div class="w-[fit-content] mx-auto">

        <div class="mb-6">
            <div class="p-3 pb-1 bg-white rounded-xl border-2 border-black shadow-sm/20 shrink-0 bg-profile relative inline-block">
                <img class="size-28 border-2 border-black rounded-md shadow-sm/20" src="profile.jpg"/>
                <div class="text-2xl py-1 text-center font-bold text-shadow-xs/20">Dekirisu</div>
            </div>
            <div class="bg-terminal text-white px-4 py-2 rounded-lg font-bold shadow-sm/30 w-40 text-lg inline-block relative align-top top-5 ml-2">
                <div class="absolute size-[24px] left-[-10px] bg-terminal rotate-45 top-[10px] rounded-sm shadow-sm/30"></div>
                I <b class="text-deki-pink decoration-dotted underline underline-offset-2 decoration-3" title="yes, this is a crabby wordplay 🦀">claw</b> my way through <b class="text-deki-blue">design</b> and <b class="text-deki-blue">code</b>!
            </div>
        </div>
 
    </div>

     <div class="gap-2 flex justify-center">
      @for (post of socials; track post.attributes.link) {
        <a href={{post.attributes.link}} class="bg-profile-lite inline-block  rounded-2xl hover:rounded-3xl p-2 border-2 border-black shadow-sm/30 hover:invert hover:scale-130 transition-all bg-[#fafaff]" title="my {{post.attributes.icon.toUpperCase()}}" rel="me">
          <img src="/socials/{{post.attributes.icon}}.svg" class="size-6">         
        </a>
      }
    </div>

     <div class="p-5  max-w-[1200px] border-t-2 border-gray-300 m-auto mt-8 text-left">
      <img src="/profile.jpg" class="inline-block size-11 xs:size-12 border-2 rounded-lg shadow-sm/30 align-top mr-1"/>
      <h3 class="text-xl xs:text-2xl font-bold mb-6 xs:mb-4 bg-terminal text-white py-2 px-4 inline-block rounded-md shadow-sm/30 relative ">
        <div class="absolute size-[16px] left-[-8px] bg-terminal rotate-45 top-[8px] shadow-sm/30"></div>
        Things I <b class="text-deki-pink">develop</b> by <b class="text-deki-orange">myself</b><b> !</b>

      </h3>
      <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" >
        @for (post of devs; track post.attributes) {
          <div class="h-48 rounded-xl overflow-hidden bg-center shadow-md/30 relative border-2" style="background-image:url({{post.attributes.thumbnail}})" class={{post.attributes.classes}}  >
            
            <div class="bg-white border-2 rounded-md text-black m-2 inline-block px-2 font-bold shadow-sm/30">
              {{post.attributes.title}}
            </div>

            <a class="bg-deki-orange border-2 rounded-md hover:rounded-2xl text-black font-bold block absolute right-2 top-2 p-1 size-7 hover:size-9 hover:right-1 hover:top-1 hover:bg-deki-blue transition-all shadow-sm/20" href="{{post.attributes.usage[1]}}" title="{{post.attributes.slug}} on {{post.attributes.usage[0].toUpperCase()}}">
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
      <img src="/profile.jpg" class="inline-block size-11 xs:size-12 border-2 rounded-lg shadow-sm/30 align-top mr-1"/>
      <h3 class="text-xl xs:text-2xl font-bold mb-6 xs:mb-4 bg-terminal text-white py-2 px-4 inline-block rounded-md shadow-sm/30 relative">
        <div class="absolute size-[16px] left-[-8px] bg-terminal rotate-45 top-[8px] shadow-sm/30"></div>
        Things I <b class="text-deki-pink">animated</b> by <b class="text-deki-orange">myself</b><b> !</b>
      </h3>
      <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" >
        @for (post of motions; track post.attributes) {
          <div class="h-48 rounded-xl overflow-hidden bg-center shadow-md/30 relative border-2" style="background-image:url({{post.attributes.thumbnail}})" class={{post.attributes.classes}}  >
            
            <div class="bg-white border-2 rounded-md text-black m-2 inline-block px-2 font-bold shadow-sm/30">
              {{post.attributes.title}}
            </div>

            <a class="bg-deki-orange border-2 rounded-md hover:rounded-2xl text-black font-bold block absolute right-2 top-2 p-1 size-7 hover:size-9 hover:right-1 hover:top-1 hover:bg-deki-blue transition-all shadow-sm/20" href="{{post.attributes.usage[1]}}" title="{{post.attributes.slug}} on {{post.attributes.usage[0].toUpperCase()}}">
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

