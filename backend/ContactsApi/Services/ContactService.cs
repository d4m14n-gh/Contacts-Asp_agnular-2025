using ContactsApi.Data;
using ContactsApi.Dto.Categories;
using ContactsApi.Dto.Contact;
using ContactsApi.Dto.Mappers;
using ContactsApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace ContactsApi.Services
{
    public class ContactService : IContactService
    {
        private readonly ContactDbContext _context;
        
        public ContactService(ContactDbContext context)
        {
            _context = context;
        }
        
        public async Task<IEnumerable<ShortContactDto>> GetAll()
        {
            var contacts = await _context.Contacts.ToListAsync();
            return contacts.Select(c => {
                // Load the related Category
                _context.Entry(c).Reference(c => c.Category).Load();
                _context.Entry(c).Reference(c => c.User).Load();
                return c.ToShortDto();
            });
        }
        
        public async Task<ContactDto?> GetById(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact != null){
                _context.Entry(contact).Reference(c => c.Category).Load();
                _context.Entry(contact).Reference(c => c.SubCategory).Load();
                _context.Entry(contact).Reference(c => c.User).Load();
            }
            return contact?.ToDto();
        }
        
        public async Task<IEnumerable<CategoryDto>> GetAllCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return categories.Select(c => c.ToDto());
        }

        public async Task<IEnumerable<CategoryDto>> GetAllSubCategories(int categoryId)
        {
            //todo chanege to categoryId
            var subCategories = await _context.SubCategories.ToListAsync();
            return subCategories.Select(c => c.ToDto());
        }

        public async Task<Contact> Create(ContactDto dto)
        {
            var contact = await dto.ToEntity(_context);
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return contact;
        }
        
        public async Task<bool> Delete(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null) 
                return false;
            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
            return true;
        }

        public Task<bool> EmailExists(string email)
        {
            return Task.FromResult(_context.Contacts.Any(c => c.Email == email));
        }
    }
}
