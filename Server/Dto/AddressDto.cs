namespace API.Dto;

public class AddressDto
{
    public int Id { get; set; }
    public required string AddressLine1 { get; set; }
    public required string? AddressLine2 { get; set; }
    public required string City { get; set; }
    public string? State { get; set; }
    public required string PostalCode { get; set; }
    public required string Country { get; set; }
    public required string AddressType { get; set; }
    public required CustomerDto Customer { get; set; }
}



