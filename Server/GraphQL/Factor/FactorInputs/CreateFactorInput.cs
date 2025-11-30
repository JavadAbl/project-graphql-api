using System.ComponentModel.DataAnnotations;

namespace API.GraphQL.Factor.FactorInputs;

public record CreateFactorInput
{

    [Required]
    public decimal TotalAmount { get; init; }
    [Required]
    public required string PaymentMethod { get; init; }
    [Required]
    public required string Status { get; init; }
    [Required]
    public int CustomerId { get; init; }
    [Required]
    public int UserId { get; init; }
    [Required]
    public int BranchId { get; init; }
    [Required]
    public int DeliveryAddressId { get; init; }

}

