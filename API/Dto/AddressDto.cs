namespace API.Dto;

public class AddressDto
{
    [IsProjected]
    public int Id { get; set; }
    public string? AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? PostalCode { get; set; }
    public string? Country { get; set; }
    public string? AddressType { get; set; }
    public CustomerDto? Customer { get; set; }
}



