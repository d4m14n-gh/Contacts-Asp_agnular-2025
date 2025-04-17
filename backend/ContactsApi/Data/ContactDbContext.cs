using ContactsApi.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ContactsApi.Data
{
    public class ContactDbContext :  IdentityDbContext<User>
    {
        public ContactDbContext(DbContextOptions<ContactDbContext> options) : base(options)
        {
        }
        public DbSet<Models.Contact> Contacts { get; set; }
        public DbSet<Models.Category> Categories { get; set; }
        public DbSet<Models.SubCategory> SubCategories { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);
        //}
    }
}
