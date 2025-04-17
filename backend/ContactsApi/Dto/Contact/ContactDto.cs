using System.ComponentModel.DataAnnotations;

namespace ContactsApi.Dto.Contact
{
    public record ContactDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Surname { get; set; }
        public required string Email { get; set; }
        public string? Password { get; set; }
        public string? Phone { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public required string Category { get; set; }
        public string? SubCategory { get; set; }
        public string? OwnSubCategory { get; set; }
        public string? User { get; set; }
    }
}
