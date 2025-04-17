using ContactsApi.Data;
using ContactsApi.Dto.Categories;
using ContactsApi.Dto.Contact;
using ContactsApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsApi.Dto.Mappers
{
    public static class ContactMapper
    {
        public static CategoryDto ToDto(this Category category)
        {
            return new CategoryDto()
            {
                Id = category.Id,
                Name = category.Name,
            };
        }
        public static CategoryDto ToDto(this SubCategory subCategory)
        {
            return new CategoryDto()
            {
                Id = subCategory.Id,
                Name = subCategory.Name,
            };
        }
        public static ContactDto ToDto(this ContactsApi.Models.Contact contact)
        {
            return new ContactDto()
            {
                Id = contact.Id,
                Name = contact.Name,
                Surname = contact.Surname,
                Email = contact.Email,
                Password = contact.Password,
                Category = contact.Category?.Name ?? "Another",
                SubCategory = contact.SubCategory?.Name,
                OwnSubCategory = contact.OwnSubCategory,
                Phone = contact.Phone,
                DateOfBirth = contact.DateOfBirth,
                User = contact.User?.Email
            };
        }
        public static ShortContactDto ToShortDto(this ContactsApi.Models.Contact contact)
        {
            return new ShortContactDto()
            {
                Id = contact.Id,
                Name = contact.Name,
                Surname = contact.Surname,
                Category = contact.Category?.Name ?? "Another",
                User = contact.User?.Email
            };
        }

        public static async Task<ContactsApi.Models.Contact> ToEntity(this ContactDto dto, ContactDbContext context)
        {
            //can be changed with category id in request dto
            var category = await context.Categories.FirstOrDefaultAsync(c => c.Name == dto.Category);
            SubCategory? subCategory = null;
            if (dto.SubCategory != null)
                subCategory = await context.SubCategories.FirstOrDefaultAsync(c => c.Name == dto.SubCategory);
            return new Models.Contact()
            {
                Id = dto.Id,
                Name = dto.Name,
                Surname = dto.Surname,
                Email = dto.Email,
                Password = dto.Password,
                Phone = dto.Phone,
                DateOfBirth = dto.DateOfBirth,
                OwnSubCategory = dto.OwnSubCategory,
                Category = category!,
                SubCategoryId = subCategory?.Id??0,
                UserID = dto.User != null ? context.Users.FirstOrDefault(u => u.UserName == dto.User)?.Id : null,
            };
        }
    }
}
