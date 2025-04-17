namespace ContactsApi.Models
{
    public class SubCategory
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int CategoryId { get; set; }
        public virtual Category? Category { get; set; }
    }
}
