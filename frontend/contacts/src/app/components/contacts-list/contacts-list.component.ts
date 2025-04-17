import { Component, OnInit } from '@angular/core';
import { ContactShortDto } from '../../dto/contact-dto';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ContactsService } from '../../contacts/contacts.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-contacts-list',
  imports: [MatIconModule, RouterModule],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.css'
})
export class ContactsListComponent implements OnInit {
  contacts: ContactShortDto[] = [];
  constructor(private contactsService: ContactsService, public authService: AuthService) {
    this.contactsService = contactsService;
    this.authService = authService;

  }
  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((contacts: ContactShortDto[]) => {
      this.contacts = contacts;
    });
  }
  deleteContact(id: number) {
    this.contactsService.deleteContact(id).subscribe({
      next: () => {
        this.contacts = this.contacts.filter(contact => contact.id !== id);
      },
      error: (error) => console.error('Error deleting contact:', error),
    });
  }
}
