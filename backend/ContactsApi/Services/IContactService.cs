using ContactsApi.Data;
using ContactsApi.Dto.Categories;
using ContactsApi.Dto.Contact;
using ContactsApi.Models;

namespace ContactsApi.Services
{
    public interface IContactService
    {
        Task<IEnumerable<ShortContactDto>> GetAll();
        Task<IEnumerable<CategoryDto>> GetAllCategories();
        Task<IEnumerable<CategoryDto>> GetAllSubCategories(int categoryId);
        Task<ContactDto?> GetById(int id);
        Task<Contact> Create(ContactDto dto);
        Task<bool> Delete(int id);
        Task<bool> EmailExists(string email);
    }
}
