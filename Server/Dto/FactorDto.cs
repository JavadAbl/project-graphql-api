namespace API.Dto;

public class FactorDto
{
    public int Id { get; set; }
    public DateTime FactorDate { get; set; }
    public decimal TotalAmount { get; set; }
    public string? PaymentMethod { get; set; }
    public string? Status { get; set; }
    public UserDto? User { get; set; }
    public BranchDto? Branch { get; set; }
    public CustomerDto? Customer { get; set; }
    public AddressDto? DeliveryAddress { get; set; }
}

