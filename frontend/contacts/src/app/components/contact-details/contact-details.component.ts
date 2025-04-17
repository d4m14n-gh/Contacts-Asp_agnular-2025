import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { ContactsService } from '../../contacts/contacts.service';
import { ContactDetailsDto } from '../../dto/contact-dto';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact-details',
  imports: [MatIcon],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent implements OnInit{
  public id?: string;
  public details?: ContactDetailsDto; 

  constructor(private route: ActivatedRoute, private router: Router, private contactService: ContactsService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    this.contactService
    .getContactDetails(Number(this.id))
    .subscribe({
      next: details => this.details = details ?? undefined,
      error: error => console.log('Error fetching contact details'),
    });
  }
}
