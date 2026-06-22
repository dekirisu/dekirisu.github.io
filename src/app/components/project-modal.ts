import { Component, input, output, ViewEncapsulation, HostListener, effect } from '@angular/core';

export interface ProjectDetail {
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  usage: string[];
  used: string[];
  state?: string;
  created?: string;
}

@Component({
  selector: 'app-project-modal',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  template: `
    @if (open()) {
      <div class="modal-overlay" (click)="close.emit()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="close.emit()">✕</button>
          
          <div class="modal-header">
            <div class="relative inline-block">
              <div class="modal-thumbnail relative overflow-hidden" style="background-image: url('{{blurUrl(project()?.thumbnail)}}'); background-size: cover; background-position: center; image-rendering: pixelated;">
                <img [src]="open() ? project()?.thumbnail : ''" [attr.data-thumb]="project()?.thumbnail" class="absolute inset-0 w-full h-full object-cover lazy-img" loading="lazy" decoding="async" onload="this.classList.add('loaded')"/>
              </div>
              @if (project()?.state) {
                <div [class]="stateClass(project()!.state!)" class="absolute top-[-8px] left-[-8px]">
                  {{stateInfo(project()!.state!).label}}
                </div>
              }
            </div>
          </div>
          
          <h2 class="modal-title">{{project()?.title}}</h2>
          
          @if (project()?.created) {
            <div class="modal-date">Started: {{project()!.created}}</div>
          }
          
          <p class="modal-description">{{project()?.description}}</p>
          
          <div class="modal-links">
            @if (project()?.usage) {
              <a [href]="project()!.usage[1]" target="_blank" class="modal-link" title="{{project()!.usage[0]}}">
                <img src="/socials/{{project()!.usage[0]}}.svg" class="size-5 inline-block align-middle mr-1"/>
                {{project()!.usage[0]}}
              </a>
            }
          </div>
          
          <div class="modal-tech">
            <span class="modal-tech-label">Tech:</span>
            <div class="modal-tech-list">
              @for (tech of project()?.used; track tech) {
                @if (techInfo(tech)) {
                  <span class="tech-pill">
                    <img src="/software/{{tech}}.svg" class="tech-pill-icon" title="{{tech}}"/>
                    <span class="tech-pill-name">{{techInfo(tech)!.name}}</span>
                    <span class="tech-pill-reason">{{techInfo(tech)!.reason}}</span>
                  </span>
                }
              }
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        animation: fadeIn 0.15s ease-out;
      }

      .modal-content {
        position: relative;
        max-width: 520px;
        width: 90%;
        max-height: 85vh;
        overflow-y: auto;
        background-color: #ffffff;
        border: 3px solid #000;
        border-radius: 16px;
        padding: 0;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
        animation: slideUp 0.2s ease-out;
      }

      html.dark .modal-content {
        background-color: #15151e;
        border-color: #fff;
      }

      .modal-close {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fafaff;
        border: 2px solid #000;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        z-index: 2;
        transition: all 0.15s ease;
        color: #000;
      }

      html.dark .modal-close {
        background-color: #2a2a3e;
        border-color: #3a3a50;
        color: #fff;
      }

      .modal-close:hover {
        background-color: #f886bd;
        transform: scale(1.1);
      }

      html.dark .modal-close:hover {
        background-color: #3a3a50;
      }

      .modal-header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 24px 24px 0;
        position: relative;
      }

      .modal-thumbnail {
        width: 180px;
        height: 120px;
        border: 3px solid #000;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .modal-thumbnail .lazy-img {
        opacity: 0;
        transition: opacity 0.4s ease;
      }

      .modal-thumbnail .lazy-img.loaded {
        opacity: 1;
      }

      html.dark .modal-thumbnail {
        border-color: #3a3a50;
      }

      .modal-title {
        text-align: center;
        font-size: 1.5rem;
        font-weight: 800;
        padding: 16px 24px 8px;
        margin: 0;
        color: #000;
      }

      html.dark .modal-title {
        color: #fff;
      }

      .modal-date {
        font-size: 0.85rem;
        font-weight: 700;
        color: #666;
        padding: 4px 24px 12px;
      }

      html.dark .modal-date {
        color: #888;
      }

      .modal-description {
        padding: 0 24px 16px;
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.6;
        color: #333;
      }

      html.dark .modal-description {
        color: #bbb;
      }

      .modal-links {
        display: flex;
        align-items: stretch;
        gap: 8px;
        padding: 0 24px 16px;
      }

      .modal-state {
        display: inline-block !important;
        min-height: 34px;
      }

      .modal-link {
        display: inline-flex;
        align-items: center;
        background-color: #ffdba1;
        border: 2px solid #000;
        border-radius: 10px;
        padding: 8px 16px;
        font-weight: 700;
        font-size: 0.9rem;
        color: #000;
        text-decoration: none;
        transition: all 0.15s ease;
      }

      .modal-link:hover {
        background-color: #8ad4fb;
        transform: scale(1.05);
      }

      .modal-tech {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 0 24px 24px;
        flex-wrap: wrap;
      }

      .modal-tech-label {
        font-size: 0.85rem;
        font-weight: 700;
        color: #666;
        white-space: nowrap;
        padding-top: 4px;
      }

      html.dark .modal-tech-label {
        color: #888;
      }

      .modal-tech-list {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        flex: 1;
      }

      .tech-pill {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        background-color: #fafaff;
        border: 2px solid #000 !important;
        border-radius: 8px;
        padding: 4px 8px;
        font-size: 0.75rem;
        transition: all 0.15s ease;
      }

      html.dark .tech-pill {
        background-color: #2a2a3e;
      }

      .tech-pill:hover {
        background-color: #ffdba1;
        transform: translateY(-1px);
      }

      html.dark .tech-pill:hover {
        background-color: #3a3a50;
      }

      .tech-pill-icon {
        width: 16px;
        height: 16px;
      }

      .tech-pill-name {
        font-weight: 700;
        color: #000;
      }

      html.dark .tech-pill-name {
        color: #fff;
      }

      .tech-pill-reason {
        color: #666;
        font-style: italic;
      }

      html.dark .tech-pill-reason {
        color: #999;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `,
  ],
})
export default class ProjectModalComponent {
  readonly open = input.required<boolean>();
  readonly project = input<ProjectDetail | null>(null);
  readonly close = output<void>();

  private static readonly TECH_MAP: Record<string, { name: string; reason: string }> = {
    analog: { name: 'Analog', reason: 'SSG framework' },
    vite: { name: 'Vite', reason: 'Build tool' },
    vitepress: { name: 'VitePress', reason: 'Docs site' },
    angular: { name: 'Angular', reason: 'UI framework' },
    tailwindcss: { name: 'Tailwind', reason: 'Utility CSS' },
    bevy: { name: 'Bevy', reason: 'ECS game engine' },
    rust: { name: 'Rust', reason: 'Performance & safety' },
    blender: { name: 'Blender', reason: '3D modeling' },
    gimp: { name: 'GIMP', reason: 'Textures & sprites' },
    photoshop: { name: 'Photoshop', reason: 'Editing & mockups' },
    illustrator: { name: 'Illustrator', reason: 'Vector art' },
    'after-effects': { name: 'After Effects', reason: 'Animation' },
    unity: { name: 'Unity', reason: 'Physics & gameplay' },
    'c-sharp': { name: 'C#', reason: 'Unity scripting' },
    nodejs: { name: 'Node.js', reason: 'Tooling & assets' },
    vim: { name: 'Vim', reason: 'Code editor' },
    vscode: { name: 'VS Code', reason: 'Code editor' },
    json: { name: 'JSON', reason: 'Config format' },
    crates_io: { name: 'crates.io', reason: 'Package registry' },
    bluesky: { name: 'Bluesky', reason: 'Showcase' },
    github: { name: 'GitHub', reason: 'Source code' },
    youtube: { name: 'YouTube', reason: 'Demo videos' },
    mastodon: { name: 'Mastodon', reason: 'Social' },
    discord_server: { name: 'Discord', reason: 'Community' },
    x: { name: 'X', reason: 'Social' },
    email: { name: 'Email', reason: 'Contact' },
    link: { name: 'Link', reason: 'External' },
    visual_studio: { name: 'VS Marketplace', reason: 'Extensions' },
    html: { name: 'HTML', reason: 'Markup' },
    css: { name: 'CSS', reason: 'Styling' },
    js: { name: 'JavaScript', reason: 'Scripting' },
  };

  techInfo(tech: string): { name: string; reason: string } | undefined {
    return ProjectModalComponent.TECH_MAP[tech];
  }

  stateInfo(state: string): { label: string; bg: string; text: string } {
    const info: Record<string, { label: string; bg: string; text: string }> = {
      wip: { label: 'WIP', bg: 'bg-deki-orange', text: 'text-black' },
      proto: { label: 'Prototype', bg: 'bg-deki-blue', text: 'text-black' },
      released: { label: 'Released', bg: 'bg-[#d65a8f]', text: 'text-white' },
      concept: { label: 'Concept', bg: 'bg-gray-300', text: 'text-black' },
      archive: { label: 'Archived', bg: 'bg-gray-500', text: 'text-white' },
      ongoing: { label: 'Ongoing', bg: 'bg-green-400', text: 'text-black' },
    };
    const s = info[state];
    return s ?? { label: state.toUpperCase(), bg: 'bg-gray-500', text: 'text-white' };
  }

  stateClass(state: string): string {
    const { bg, text } = this.stateInfo(state);
    return bg + ' border-2 border-black rounded-lg ' + text + ' font-bold px-3 py-[10px] shadow-sm/30 w-fit text-xs uppercase tracking-wider leading-none flex items-center';
  }

  blurUrl(thumbnail: string | undefined): string {
    if (!thumbnail) return '';
    const name = thumbnail.split('/').pop()!;
    return '/thumbnails/blurred/' + name.replace(/\.[^.]+$/, '.png');
  }

  constructor() {
    effect(() => {
      if (this.open()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.close.emit();
  }
}
