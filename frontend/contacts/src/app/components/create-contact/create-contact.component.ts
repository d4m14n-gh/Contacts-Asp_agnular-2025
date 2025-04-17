import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ContactsService } from '../../contacts/contacts.service';
import { categoryDto, ContactDetailsDto } from '../../dto/contact-dto';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-create-contact',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './create-contact.component.html',
  styleUrl: './create-contact.component.css'
})
export class CreateContactComponent implements OnInit {
  contactDto?: ContactDetailsDto;
  categories: categoryDto[] = []; 
  subCategories: categoryDto[] = []; 
  public contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contacts: ContactsService, private router: Router) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8)]],
      phone: [''],
      category: [''],
      subCategory: [''],
      dateOfBirth: [null],
      ownSubCategory: ['']
    });
  }
  ngOnInit(): void {
    this.contacts.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    });
    // can be changed 
    this.contacts.getSubCategories(1).subscribe({
      next: (subCategories) => this.subCategories = subCategories
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) 
      return;
    const formValues = this.contactForm.value;
    this.contactDto = new ContactDetailsDto(
      0,
      formValues.name,
      formValues.surname,
      formValues.email,
      formValues.password,
      formValues.category,
      formValues.subCategory,
      formValues.phone,
      formValues.dateOfBirth,
      formValues.ownSubCategory
    );
    this.contacts.createContact(this.contactDto).subscribe({
      next: () => {
        console.log('Contact created successfully!');
        this.router.navigate(['/contacts']);
      },
      error: (err) => {
        console.error('Error creating contact:', err);
      }
    });
  }
}
