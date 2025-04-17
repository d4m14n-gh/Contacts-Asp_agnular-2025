export class categoryDto {
    public id: number;
    public name: string;
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class ContactShortDto {
    public id: number;
    public name: string;
    public surname: string;
    public category: string;
    public user?: string;
    public constructor(id: number, name: string, surname: string, category: string, user?: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.category = category;
        this.user = user;
    }
}
export class ContactDetailsDto {
    public id: number;
    public name: string;
    public surname?: string;
    public email?: string;
    public password?: string;
    public phone?: string;
    public category: string;
    public dateOfBirth?: Date;
    public subCategory?: string;
    public ownSubCategory?: string;
    public user?: string;
    constructor(id: number, name: string, surname?: string, email?: string, password?: string, category?: string, subCategory?: string, phone?: string, dateOfBirth?: Date, ownSubCategory?: string, user?: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.category = category!;
        this.subCategory = subCategory;
        this.ownSubCategory = ownSubCategory;
        this.user = user;
    }
}