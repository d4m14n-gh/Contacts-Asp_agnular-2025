import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { categoryDto, ContactDetailsDto, ContactShortDto } from '../dto/contact-dto';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiUrl: string =  environment.apiUrl;
  constructor(private http: HttpClient) { 

  }
  getCategories(): Observable<categoryDto[]> {
    return this.http.get<categoryDto[]>(`${this.apiUrl}/contacts/categories`);
  }
  getSubCategories(categoryId: number): Observable<categoryDto[]> {
    return this.http.get<categoryDto[]>(`${this.apiUrl}/contacts/categories/${categoryId}/subcategories`);
  }
  getContacts(): Observable<ContactShortDto[]> {
    return this.http.get<ContactShortDto[]>(`${this.apiUrl}/contacts`);
  }
  getContactDetails(id: number): Observable<ContactDetailsDto> {
    return this.http.get<ContactDetailsDto>(`${this.apiUrl}/contacts/${id}`)
  }
  createContact(contact: ContactDetailsDto): Observable<ContactDetailsDto> {
    return this.http.post<ContactDetailsDto>(`${this.apiUrl}/contacts`, contact);
  }
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/contacts/${id}`);
  }
  updateContact(id: number, contact: ContactDetailsDto): Observable<ContactDetailsDto> {
    return this.http.put<ContactDetailsDto>(`${this.apiUrl}/contacts/${id}`, contact);
  }
}
