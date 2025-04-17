using ContactsApi.Models;
using ContactsApi.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ContactsApi.Data
{
    public static class Seeder
    {
        public static async Task SeedAsync(ContactDbContext context)
        {
            if(!context.Categories.Any())
            {
                context.Categories.Add(
                    new Category {
                        Id = 1,
                        Name = "Business",
                    }
                );
                context.Categories.Add(
                    new Category
                    {
                        Id = 2,
                        Name = "Private",
                    }
                );
                context.Categories.Add(
                    new Category
                    {
                        Id = 3,
                        Name = "Other",
                    }
                );
                await context.SaveChangesAsync();
            }
            if (!context.SubCategories.Any())
            {
                context.SubCategories.Add(
                    new SubCategory
                    {
                        Id = 1,
                        Name = "Boss",
                        CategoryId = 1,
                    }
                );
                context.SubCategories.Add(
                    new SubCategory
                    {
                        Id = 2,
                        Name = "Client",
                        CategoryId = 1,
                    }
                );
                context.SubCategories.Add(
                    new SubCategory
                    {
                        Id = 3,
                        Name = "Manager",
                        CategoryId = 1,
                    }
                );
                await context.SaveChangesAsync();
            }
            if (!context.Contacts.Any())
            {
                context.Contacts.Add(
                    new Contact
                    {
                        Name = "John",
                        Surname = "Doe",
                        CategoryId = 1,
                        SubCategoryId = 1,
                        Phone = "123456789",
                        Email = "johndoe@exmaple.com",
                        DateOfBirth = new DateTime(1990, 1, 1)
                    }
                );
                await context.SaveChangesAsync();
            }
        }
    }
}
