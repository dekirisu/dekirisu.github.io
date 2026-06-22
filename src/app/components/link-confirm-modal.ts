import { Component, input, output, ViewEncapsulation } from '@angular/core';

export type LinkAction = 'newtab' | 'here' | 'cancel';

@Component({
  selector: 'app-link-confirm-modal',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  styles: [
    `
      :host {
        display: block;
      }

      .link-modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 200;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        animation: fadeIn 0.15s ease-out;
      }

      .link-modal-content {
        position: relative;
        max-width: 400px;
        width: 90%;
        background-color: #fafaff;
        border: 3px solid #000;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.2s ease-out;
      }

      html.dark .link-modal-content {
        background-color: #1a1a2e;
        border-color: #3a3a50;
      }

      .link-modal-title {
        font-size: 1.1rem;
        font-weight: 800;
        margin-bottom: 12px;
        color: #000;
      }

      html.dark .link-modal-title {
        color: #fff;
      }

      .link-modal-url {
        font-size: 0.85rem;
        color: #666;
        word-break: break-all;
        margin-bottom: 20px;
        padding: 8px;
        background: #f0f0f0;
        border-radius: 8px;
        border: 1px solid #ddd;
      }

      html.dark .link-modal-url {
        color: #aaa;
        background: #2a2a3e;
        border-color: #3a3a50;
      }

      .link-modal-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        align-items: center;
      }

      .link-modal-action-group {
        display: flex;
        gap: 8px;
      }

      .link-modal-btn {
        padding: 8px 20px;
        border: 2px solid #000;
        border-radius: 8px;
        font-weight: 700;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .link-modal-btn.newtab {
        background-color: #ffdba1;
        color: #000;
      }

      .link-modal-btn.newtab:hover {
        background-color: #8ad4fb;
      }

      .link-modal-btn.here {
        background-color: transparent;
        color: #666;
        border: 1px solid #ccc;
        font-size: 0.8rem;
        padding: 6px 12px;
      }

      html.dark .link-modal-btn.here {
        background-color: transparent;
        color: #888;
        border-color: #3a3a50;
      }

      .link-modal-btn.here:hover {
        color: #000;
        border-color: #999;
      }

      html.dark .link-modal-btn.here:hover {
        color: #ccc;
        border-color: #555;
      }

      .link-modal-btn.cancel {
        background-color: transparent;
        color: #666;
        border: 1px solid #ccc;
        font-size: 0.8rem;
        padding: 6px 12px;
      }

      html.dark .link-modal-btn.cancel {
        background-color: transparent;
        color: #888;
        border-color: #3a3a50;
      }

      .link-modal-btn.cancel:hover {
        color: #000;
        border-color: #999;
      }

      html.dark .link-modal-btn.cancel:hover {
        color: #ccc;
        border-color: #555;
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
  template: `
    @if (open()) {
      <div class="link-modal-overlay" (click)="cancel.emit('cancel')">
        <div class="link-modal-content" (click)="$event.stopPropagation()">
          <div class="link-modal-title">Open this link?</div>
          <div class="link-modal-url">{{url()}}</div>
          <div class="link-modal-actions">
            <div class="link-modal-action-group">
              <button class="link-modal-btn cancel" (click)="cancel.emit('cancel')">Cancel</button>
              <button class="link-modal-btn here" (click)="action.emit('here')">Here</button>
            </div>
            <button class="link-modal-btn newtab" (click)="action.emit('newtab')">New Tab</button>
          </div>
        </div>
      </div>
    }
  `,
})
export default class LinkConfirmModalComponent {
  readonly open = input.required<boolean>();
  readonly url = input.required<string>();
  readonly action = output<LinkAction>();
  readonly cancel = output<LinkAction>();
}
