import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-compose-message',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.scss']
})
export class ComposeMessageComponent {
  standardAttributes = [
    'First Name',
    'Last Name',
    'Address',
    'City',
    'Country',
    'Gender'
  ];

  customAttributes: string[] = [];
  selectedVariable1 = '';
  selectedVariable2 = '';
  imageUrl = '';
  videoUrl = '';
  documentUrl = '';
  yesPayload = '';
  noPayload = '';
  unsubPayload = '';
  visitPayload = '';
  openDropdownFor: string | null = null;
  attributeSearch = '';
  activeAttributeTab: 'standard' | 'custom' = 'standard';

  get filteredStandardAttributes(): string[] {
    if (!this.attributeSearch.trim()) return this.standardAttributes;
    const q = this.attributeSearch.toLowerCase();
    return this.standardAttributes.filter(a => a.toLowerCase().includes(q));
  }

  get filteredCustomAttributes(): string[] {
    if (!this.attributeSearch.trim()) return this.customAttributes;
    const q = this.attributeSearch.toLowerCase();
    return this.customAttributes.filter(a => a.toLowerCase().includes(q));
  }

  toggleDropdownField(fieldId: string): void {
    this.openDropdownFor = this.openDropdownFor === fieldId ? null : fieldId;
    this.attributeSearch = '';
    this.activeAttributeTab = 'standard';
  }

  closeDropdown(): void {
    this.openDropdownFor = null;
  }

  selectAttribute(value: string): void {
    const field = this.openDropdownFor;
    if (field === 'var1') this.selectedVariable1 = value;
    else if (field === 'var2') this.selectedVariable2 = value;
    else if (field === 'img') this.imageUrl = value;
    else if (field === 'video') this.videoUrl = value;
    else if (field === 'doc') this.documentUrl = value;
    else if (field === 'yes') this.yesPayload = value;
    else if (field === 'no') this.noPayload = value;
    else if (field === 'unsub') this.unsubPayload = value;
    else if (field === 'visit') this.visitPayload = value;
    this.closeDropdown();
  }

  onCancel(): void {
    this.closeDropdown();
  }

  onDoneComposing(): void {
    this.closeDropdown();
  }
}
