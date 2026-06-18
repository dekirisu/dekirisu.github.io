import { Component, input, output, ViewEncapsulation, HostListener } from '@angular/core';

export interface ProjectDetail {
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  usage: string[];
  used: string[];
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
            <img [src]="project()?.thumbnail" class="modal-thumbnail" alt="{{project()?.title}}"/>
          </div>
          
          <h2 class="modal-title">{{project()?.title}}</h2>
          
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
            <div class="modal-tech-icons">
              @for (tech of project()?.used; track tech) {
                <img src="/software/{{tech}}.svg" class="tech-icon" title="{{tech}}"/>
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
        background-color: #fafaff;
        border: 3px solid #000;
        border-radius: 16px;
        padding: 0;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
        animation: slideUp 0.2s ease-out;
      }

      html.dark .modal-content {
        background-color: #1a1a2e;
        border-color: #3a3a50;
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
      }

      .modal-thumbnail {
        width: 180px;
        height: 120px;
        object-fit: cover;
        border: 3px solid #000;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
        padding: 0 24px 16px;
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

      html.dark .modal-link {
        background-color: #2a2a3e;
        border-color: #3a3a50;
        color: #fff;
      }

      .modal-link:hover {
        background-color: #8ad4fb;
        transform: scale(1.05);
      }

      html.dark .modal-link:hover {
        background-color: #3a3a50;
      }

      .modal-tech {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 24px 24px;
      }

      .modal-tech-label {
        font-size: 0.85rem;
        font-weight: 700;
        color: #666;
        white-space: nowrap;
      }

      html.dark .modal-tech-label {
        color: #888;
      }

      .modal-tech-icons {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }

      .tech-icon {
        width: 28px;
        height: 28px;
        border: 2px solid #000;
        border-radius: 6px;
        background-color: #fafaff;
        padding: 2px;
        transition: transform 0.15s ease;
      }

      html.dark .tech-icon {
        border-color: #3a3a50;
        background-color: #2a2a3e;
      }

      .tech-icon:hover {
        transform: scale(1.2);
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

  @HostListener('document:keydown.escape')
  onEscape() {
    this.close.emit();
  }
}
