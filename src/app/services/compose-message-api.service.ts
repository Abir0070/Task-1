import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const DEFAULT_BASE_URL = '/api';

export interface TemplateDetails {
  templateId: string;
  templateName: string;
  messageType: string;
  language: string;
}

export interface ComposedMessagePayload {
  templateId: string;
  imageUrl?: string;
  videoUrl?: string;
  documentUrl?: string;
  locationLatitude?: number;
  locationLongitude?: number;
  variables?: Record<string, string>;
  buttonPayloads?: Record<string, string>;
}

@Injectable({
  providedIn: 'root'
})
export class ComposeMessageApiService {
  private baseUrl = DEFAULT_BASE_URL;

  constructor(private http: HttpClient) {}

  /**
   * Set API base URL (e.g. environment.apiUrl).
   * Call before any request if base URL differs from /api.
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url.replace(/\/$/, '');
  }

  /**
   * Get template details by ID.
   * GET /api/templates/:templateId
   */
  getTemplate(templateId: string): Observable<TemplateDetails> {
    return this.http.get<TemplateDetails>(`${this.baseUrl}/templates/${encodeURIComponent(templateId)}`);
  }

  /**
   * Get list of standard attributes for variable/attribute dropdown.
   * GET /api/attributes/standard
   */
  getStandardAttributes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/attributes/standard`);
  }

  /**
   * Get list of custom attributes.
   * GET /api/attributes/custom
   */
  getCustomAttributes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/attributes/custom`);
  }

  /**
   * Submit the composed message payload.
   * POST /api/messages/compose
   */
  submitComposedMessage(payload: ComposedMessagePayload): Observable<{ messageId: string }> {
    return this.http.post<{ messageId: string }>(`${this.baseUrl}/messages/compose`, payload);
  }

  /**
   * Validate composed message payload without submitting.
   * POST /api/messages/validate
   */
  validateComposedMessage(payload: ComposedMessagePayload): Observable<{ valid: boolean; errors?: string[] }> {
    return this.http.post<{ valid: boolean; errors?: string[] }>(`${this.baseUrl}/messages/validate`, payload);
  }
}
