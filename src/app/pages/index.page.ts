import { Component, signal, afterNextRender } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';

import PostAttributes from '../post-attributes';
import ProjectModal from '../components/project-modal';

export interface SocialAttributes {
  icon: string;
  link: string;
}

export interface PageAttributes {
  slug: string;
  thumbnail: string;
  title: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-blog',
  imports: [RouterLink, ProjectModal],

  template: `

    <!--
    <div class="bg-warning text-center absolute top-0 w-[100%] text-white font-bold text-shadow-md/30 p-1">Under Construction</div>
    <div class="size-8"></div>
    -->

    <div class="w-[fit-content] mx-auto">

        <div class="mb-6">
            <div class="p-3 pb-1 bg-white rounded-xl border-2 border-black shadow-sm/20 shrink-0 bg-profile relative inline-block" id="profile-container" style="overflow: visible; will-change: transform;">
                <img class="size-28 border-2 border-black rounded-md shadow-sm/20 cursor-pointer" src="profile.jpg" id="profile-img" onclick="blockDamage()" title="click to block"/>
                <div class="text-2xl py-1 text-center font-bold text-shadow-xs/20">Dekirisu</div>
            </div>
            <div class="bg-terminal text-white px-4 py-2 rounded-lg font-bold shadow-sm/30 w-40 text-lg inline-block relative align-top top-5 ml-2">
                <div class="absolute size-[24px] left-[-10px] bg-terminal rotate-45 top-[10px] rounded-sm shadow-sm/30"></div>
                I <b class="text-deki-pink decoration-dotted underline underline-offset-2 decoration-3 cursor-pointer select-none" title="don't click that" onclick="damageProfile()" onmousedown="event.preventDefault()" onselectstart="return false" unselectable="on">claw</b> my way through <b class="text-deki-blue">design</b> and <b class="text-deki-blue">code</b>!
            </div>
        </div>
 
    </div>

     <div class="gap-2 flex justify-center">
      @for (post of socials; track post.attributes.link) {
        <a href={{post.attributes.link}} target="_blank" class="bg-profile-lite inline-block rounded-2xl hover:rounded-3xl p-2 border-2 border-black shadow-sm/30 hover:invert hover:scale-130 hover:-translate-y-0.5 active:scale-110 transition-all duration-200 bg-[#fafaff]" title="my {{post.attributes.icon.toUpperCase()}}" rel="me">
          <img src="/socials/{{post.attributes.icon}}.svg" class="size-6">         
        </a>
      }
    </div>

    <div class="p-5 pb-0 max-w-[1200px] border-t-2 border-[#d8dce4] m-auto mt-8">
      <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        @for (post of pages; track post.attributes.slug) {
          <a href="{{post.attributes.url}}" target="_blank" class="h-[136px] rounded-xl overflow-hidden bg-center shadow-md/30 relative border-2 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200" style="background-image: url('{{blurUrl(post.attributes.thumbnail)}}'); background-size: cover; background-position: center;" title="{{post.attributes.title}}">
            <img [attr.data-thumb]="post.attributes.thumbnail" class="absolute inset-0 w-full h-full object-cover rounded-xl lazy-img" loading="lazy" decoding="async" onload="this.classList.add('loaded')"/>
            <div class="absolute inset-0 bg-black/50"></div>
            <div class="relative m-2">
              <div class="bg-white border-2 rounded-md text-black inline-block px-3 py-1 font-bold shadow-sm/30">
                {{post.attributes.title}}
              </div>
              <div class="text-white font-bold text-sm mt-1 max-w-[175px] leading-tight" style="margin-left: 6px; text-shadow: 0 0 4px #000, 0 0 16px #000, 0 0 24px #000;">
                {{post.attributes.description}}
              </div>
            </div>
            <div class="absolute right-2 bottom-2 bg-deki-orange border-2 border-black rounded-md text-black font-bold px-2 py-0.5 shadow-sm/30 text-xs flex items-center gap-1">
              <span class="text-sm">→</span>
              <span>explore</span>
            </div>
          </a>
        }
      </div>
    </div>

     <div class="p-5  max-w-[1200px] border-t-2 border-[#d8dce4] m-auto mt-8 text-left">
      <img src="/profile.jpg" class="inline-block size-11 xs:size-12 border-2 rounded-lg shadow-sm/30 align-top mr-1"/>
      <h3 class="text-xl xs:text-2xl font-bold mb-6 xs:mb-4 bg-terminal text-white py-2 px-4 inline-block rounded-md shadow-sm/30 relative ">
        <div class="absolute size-[16px] left-[-8px] bg-terminal rotate-45 top-[8px] shadow-sm/30"></div>
        Things I <b class="text-deki-pink">develop</b> by <b class="text-deki-orange">myself</b><b> !</b>
      </h3>
      <div class="flex gap-2 mb-4 flex-wrap">
        <button class="filter-btn {{activeDevFilter() === 'all' ? 'active' : ''}}" (click)="setDevFilter('all')">All</button>
        <button class="filter-btn {{activeDevFilter() === 'rustdev' ? 'active' : ''}}" (click)="setDevFilter('rustdev')">LibDev</button>
        <button class="filter-btn {{activeDevFilter() === 'gamedev' ? 'active' : ''}}" (click)="setDevFilter('gamedev')">GameDev</button>
        <button class="filter-btn {{activeDevFilter() === 'webdev' ? 'active' : ''}}" (click)="setDevFilter('webdev')">WebDev</button>
        <button class="filter-btn {{activeDevFilter() === 'other' ? 'active' : ''}}" (click)="setDevFilter('other')">Other</button>
      </div>
      <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" >
        @for (post of filteredDevs; track post.attributes) {
          <div class="h-48 rounded-xl overflow-hidden relative border-2 shadow-md/30 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200" style="background-image: url('{{blurUrl(post.attributes.thumbnail)}}'); background-size: cover; background-position: center; image-rendering: pixelated;" (click)="openProject(post.attributes)" >
            <img [attr.data-thumb]="post.attributes.thumbnail" class="absolute inset-0 w-full h-full object-cover lazy-img" loading="lazy" decoding="async" onload="this.classList.add('loaded')"/>
            <div class="m-2 absolute inset-0">
              <div class="bg-white border-2 rounded-md text-black inline-block px-2 font-bold shadow-sm/30">
                {{post.attributes.title}}
              </div>
              @if (post.attributes.state) {
                <div [class]="stateClass(post.attributes.state)">
                  {{stateInfo(post.attributes.state).label}}
                </div>
              }
            </div>

            <a class="bg-deki-orange border-2 rounded-md hover:rounded-2xl text-black font-bold block absolute right-2 top-2 p-1 size-7 hover:size-9 hover:right-1 hover:top-1 hover:bg-deki-blue transition-all shadow-sm/20" href="{{post.attributes.usage[1]}}" target="_blank" title="{{post.attributes.slug}} on {{post.attributes.usage[0].toUpperCase()}}" (click)="$event.stopPropagation()">
                <img class="size-[100%]" src="/socials/{{post.attributes.usage[0]}}.svg"/>
            </a>

            @if (post.attributes.created) {
              <div class="absolute right-2 bottom-13 bg-deki-blue border-2 border-black rounded-md text-black font-bold px-2 py-0.5 shadow-sm/30 text-xs">
                {{post.attributes.created}}
              </div>
            }

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


    <div class="p-5  max-w-[1200px] border-t-2 border-[#d8dce4] m-auto mt-8 text-left">
      <img src="/profile.jpg" class="inline-block size-11 xs:size-12 border-2 rounded-lg shadow-sm/30 align-top mr-1"/>
      <h3 class="text-xl xs:text-2xl font-bold mb-6 xs:mb-4 bg-terminal text-white py-2 px-4 inline-block rounded-md shadow-sm/30 relative">
        <div class="absolute size-[16px] left-[-8px] bg-terminal rotate-45 top-[8px] shadow-sm/30"></div>
        Things I <b class="text-deki-pink">animated</b> <b class="text-deki-orange">..</b>
      </h3>
      <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" >
        @for (post of motions; track post.attributes) {
          <div class="h-48 rounded-xl overflow-hidden relative border-2 shadow-md/30 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200" style="background-image: url('{{blurUrl(post.attributes.thumbnail)}}'); background-size: cover; background-position: center; image-rendering: pixelated;" (click)="openProject(post.attributes)" >
            <img [attr.data-thumb]="post.attributes.thumbnail" class="absolute inset-0 w-full h-full object-cover lazy-img" loading="lazy" decoding="async" onload="this.classList.add('loaded')"/>
            <div class="m-2 absolute inset-0">
              <div class="bg-white border-2 rounded-md text-black inline-block px-2 font-bold shadow-sm/30">
                {{post.attributes.title}}
              </div>
              @if (post.attributes.state) {
                <div [class]="stateClass(post.attributes.state)">
                  {{stateInfo(post.attributes.state).label}}
                </div>
              }
            </div>

            <a class="bg-deki-orange border-2 rounded-md hover:rounded-2xl text-black font-bold block absolute right-2 top-2 p-1 size-7 hover:size-9 hover:right-1 hover:top-1 hover:bg-deki-blue transition-all shadow-sm/20" href="{{post.attributes.usage[1]}}" target="_blank" title="{{post.attributes.slug}} on {{post.attributes.usage[0].toUpperCase()}}" (click)="$event.stopPropagation()">
                <img class="size-[100%]" src="/socials/{{post.attributes.usage[0]}}.svg"/>
            </a>

            @if (post.attributes.created) {
              <div class="absolute right-2 bottom-2 bg-deki-blue border-2 border-black rounded-md text-black font-bold px-2 py-0.5 shadow-sm/30 text-xs">
                {{post.attributes.created}}
              </div>
            }

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


    <div class="mt-8 p-2 border-t-2 border-[#d8dce4] text-gray-500 text-right max-w-[1200px] mx-auto relative">
        made with <a href="https://analogjs.org/" target="_blank" class="font-bold text-red-700"><img src="/software/analog.svg" class="size-5 inline-block align-sub"> Analog</a>
        and <a href="https://tailwindcss.com/" target="_blank" class="font-bold text-sky-500"><img src="/software/tailwindcss.svg" class="size-5 inline-block align-sub"> Tailwind</a>
        <span class="crab-wrapper">
          <span class="crab-text">yo!</span>
          <input type="checkbox" id="crab-toggle" hidden>
          <label for="crab-toggle" class="crab-footer" title="click">🦀</label>
        </span>
    </div>

    <app-project-modal
      [open]="!!selectedProject()"
      [project]="selectedProject()"
      (close)="closeProject()"
    />
  `,
  styles: [`
    .lazy-img {
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    .lazy-img.loaded {
      opacity: 1;
    }

    .filter-btn {
      padding: 4px 12px;
      border: 2px solid #000;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;
      background-color: #fafaff;
      color: #000;
      transition: all 0.15s ease;
    }

    .filter-btn:hover {
      background-color: #ffdba1;
      transform: translateY(-1px);
    }

    .filter-btn.active {
      background-color: #8ad4fb;
    }

    html.dark .filter-btn {
      background-color: #2a2a3e;
      color: #fff;
    }

    html.dark .filter-btn:hover {
      background-color: #3a3a50;
    }

    html.dark .filter-btn.active {
      background-color: #1a3a5c;
      border: 3px solid #5a9ad4;
    }
  `],
})

export default class BlogComponent {
  constructor() {
    afterNextRender(() => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      if (params.get('rtx') === 'off') return;
      document.querySelectorAll<HTMLImageElement>('.lazy-img').forEach(img => {
        const thumb = img.getAttribute('data-thumb');
        if (thumb) img.src = thumb;
      });
    });
  }

  readonly socials = injectContentFiles<SocialAttributes>(
    (file) => file.filename.includes('/src/content/socials/')
  );
  readonly motions = injectContentFiles<PostAttributes>(
    (file) => file.filename.includes('src/content/motion/') && !file.attributes.hidden
  );
  readonly devs = injectContentFiles<PostAttributes>(
    (file) => file.filename.includes('src/content/devs/')
  );
  readonly pages = injectContentFiles<PageAttributes>(
    (file) => file.filename.includes('src/content/pages/')
  );

  readonly activeDevFilter = signal<string>('all');

  setDevFilter(filter: string) {
    this.activeDevFilter.set(filter);
  }

  get filteredDevs() {
    const filter = this.activeDevFilter();
    if (filter === 'all') return this.devs;
    if (filter === 'other') return this.devs.filter(d => d.attributes.category !== 'rustdev' && d.attributes.category !== 'gamedev' && d.attributes.category !== 'webdev');
    return this.devs.filter(d => d.attributes.category === filter);
  }

  readonly selectedProject = signal<PostAttributes | null>(null);

  openProject(project: PostAttributes) {
    this.selectedProject.set(project);
  }

  closeProject() {
    this.selectedProject.set(null);
  }

  stateInfo(state: string): { label: string; bg: string; text: string } {
    const info: Record<string, { label: string; bg: string; text: string }> = {
      wip: { label: 'WIP', bg: 'bg-green-300', text: 'text-black' },
      proto: { label: 'Prototype', bg: 'bg-[#a8a0d4]', text: 'text-black' },
      released: { label: 'Released', bg: 'bg-deki-blue', text: 'text-black' },
      concept: { label: 'Concept', bg: 'bg-gray-300', text: 'text-black' },
      archive: { label: 'Archived', bg: 'bg-gray-500', text: 'text-white' },
      paused: { label: 'Paused', bg: 'bg-gray-500', text: 'text-white' },
      ongoing: { label: 'Ongoing', bg: 'bg-green-300', text: 'text-black' },
    };
    const s = info[state];
    return s ?? { label: state.toUpperCase(), bg: 'bg-gray-500', text: 'text-white' };
  }

  stateClass(state: string): string {
    const { bg, text } = this.stateInfo(state);
    return bg + ' border-2 border-black rounded-md ' + text + ' font-bold px-2 py-0.5 mt-1 block shadow-sm/30 w-fit text-xs uppercase tracking-wider';
  }

  blurUrl(thumbnail: string): string {
    const name = thumbnail.split('/').pop()!;
    return '/thumbnails/blurred/' + name.replace(/\.[^.]+$/, '.png');
  }
}

