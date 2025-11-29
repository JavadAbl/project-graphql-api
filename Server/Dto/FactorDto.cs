namespace API.Dto;

public class FactorDto
{
    public int Id { get; set; }
    public DateTime FactorDate { get; set; }
    public decimal TotalAmount { get; set; }
    public required string PaymentMethod { get; set; }
    public required string Status { get; set; }
    public required UserDto User { get; set; }
    public required BranchDto Branch { get; set; }
    public required CustomerDto Customer { get; set; }
    public AddressDto? DeliveryAddress { get; set; }
}

