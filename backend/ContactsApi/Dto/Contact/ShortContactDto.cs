namespace ContactsApi.Dto.Contact
{
    public class ShortContactDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Surname { get; set; }
        public required string Category { get; set; }
        public string? User { get; set; }
    }
}
