import { Component, OnInit } from '@angular/core';
import { categoryDto, ContactDetailsDto } from '../../dto/contact-dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../../contacts/contacts.service';

@Component({
  selector: 'app-update-contact',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './update-contact.component.html',
  styleUrl: './update-contact.component.css'
})
export class UpdateContactComponent implements OnInit {
  contactDto?: ContactDetailsDto;
  categories: categoryDto[] = []; 
  subCategories: categoryDto[] = []; 
  id?: string;
  public contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contacts: ContactsService, private router: Router, private route: ActivatedRoute) {
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
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    console.log(this.id);
    this.contacts.getContactDetails(Number(this.id)).subscribe({
      next: (contact) => {
        this.contactDto = contact;
        this.contactForm.patchValue({
          name: contact.name,
          surname: contact.surname,
          email: contact.email,
          password: contact.password,
          phone: contact.phone,
          category: contact.category,
          subCategory: contact.subCategory,
          dateOfBirth: contact.dateOfBirth?.toString().split("T")[0],
          ownSubCategory: contact.ownSubCategory
        });
      },
      error: (error) => console.log('Error fetching contact details', error),
    });
   
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
    this.contacts.updateContact(Number(this.id??0), this.contactDto).subscribe({
      next: () => {
        console.log('Contact updated successfully!');
        this.router.navigate(['/contacts']);
      },
      error: (err) => {
        console.error('Error updating contact:', err);
      }
    });
  }
}
