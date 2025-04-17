using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using static System.Net.WebRequestMethods;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ContactsApi.Models
{
    public class Contact()
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(255)]
        public required string Name { get; set; }
        
        [MaxLength(255)]
        public string? Surname { get; set; }

        [EmailAddress]
        [Required]
        [MaxLength(255)]
        public required string Email { get; set; }
        
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$")]
        [MaxLength(255)]
        public string? Password { get; set; }
        
        [MaxLength(255)]
        public string? Phone { get; set; }

        public DateTime? DateOfBirth { get; set; }

        //categories
        [Required]
        public int CategoryId { get; set; }

        [Required]
        public virtual Category? Category { get; set; }

        public int? SubCategoryId { get; set; }

        public virtual SubCategory? SubCategory { get; set; }

        [MaxLength(255)]
        public string? OwnSubCategory { get; set; }

        public string? UserID { get; set; }
        public virtual User? User { get; set; }

    }
}
