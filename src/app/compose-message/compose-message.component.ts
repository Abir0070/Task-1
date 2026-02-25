import { Component, signal, computed, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

const STANDARD_ATTRIBUTES = [
  'First Name',
  'Last Name',
  'Address',
  'City',
  'Country',
  'Gender',
];

@Component({
  selector: 'app-compose-message',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compose-message.component.html',
  styleUrl: './compose-message.component.css',
})
export class ComposeMessageComponent {
  private el = inject(ElementRef);
  form: FormGroup;
  attributeSearch = new FormControl('');
  showAttributeDropdown = signal<number | null>(null);
  standardAttributes = STANDARD_ATTRIBUTES;
  customAttributes: string[] = [];
  selectedAttribute = signal<Record<number, string>>({});
  private allowClose = false;
  readonly braceIcon = '\u007b\u007b\u007d\u007d'; /* {{ }} */

  filteredStandard = computed(() => {
    const q = (this.attributeSearch.value ?? '').toLowerCase();
    if (!q) return this.standardAttributes;
    return this.standardAttributes.filter((a) =>
      a.toLowerCase().includes(q)
    );
  });

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      imageUrl: ['', [Validators.maxLength(2048)]],
      videoUrl: ['', [Validators.maxLength(2048)]],
      documentUrl: ['', [Validators.maxLength(2048)]],
      locationLatitude: [null as number | null, []],
      locationLongitude: [null as number | null, []],
      variable1: [''],
      variable2: [''],
      yesButtonPayload: ['', [Validators.maxLength(128)]],
      noButtonPayload: ['', [Validators.maxLength(128)]],
      unsubscribeButtonPayload: ['', [Validators.maxLength(128)]],
      visitWebsiteParam: [''],
    });
  }

  openAttributeDropdown(variableIndex: number): void {
    this.attributeSearch.setValue('');
    this.showAttributeDropdown.set(variableIndex);
    this.allowClose = false;
    setTimeout(() => (this.allowClose = true), 100);
  }

  closeAttributeDropdown(): void {
    this.showAttributeDropdown.set(null);
  }

  selectAttribute(variableIndex: number, attr: string): void {
    const path = `variable${variableIndex}`;
    const ctrl = this.form.get(path);
    if (ctrl) {
      (ctrl as FormControl).setValue(attr);
    }
    this.selectedAttribute.update((s) => ({ ...s, [variableIndex]: attr }));
    this.closeAttributeDropdown();
  }

  getCharCount(value: string | null, max: number): string {
    return `${(value ?? '').length}/${max}`;
  }

  getVariableValue(index: number): string {
    return this.form.get(`variable${index}`)?.value ?? '';
  }

  cancel(): void {
    this.form.reset();
  }

  doneComposing(): void {
    if (this.form.valid) {
      console.log('Form submitted', this.form.value);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.allowClose || this.showAttributeDropdown() === null) return;
    const el = this.el.nativeElement as HTMLElement;
    const dropdown = el.querySelector('.attribute-dropdown');
    const target = event.target as Node;
    if (dropdown?.contains(target)) return;
    this.closeAttributeDropdown();
  }
}
