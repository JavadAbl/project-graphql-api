namespace API.Entity;

public class Address
{
    public int Id { get; set; }
    public required string AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public required string City { get; set; }
    public string? State { get; set; }
    public required string PostalCode { get; set; }
    public required string Country { get; set; }
    public required string AddressType { get; set; }

    // --- Navigation Property ---
    public required virtual Customer Customer { get; set; }
    public int CustomerId { get; set; }
}