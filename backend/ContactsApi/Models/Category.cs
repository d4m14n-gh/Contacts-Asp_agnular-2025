using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ContactsApi.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
        [JsonIgnore]
        public virtual List<SubCategory>? SubCategories { get; set; }
    }
}
