using System.ComponentModel.DataAnnotations;
using Server.Enums;
using Server.GraphQL.Factor.FactorInputs;

namespace API.GraphQL.Factor.FactorInputs;

public record CreateFactorInput
{

    [Required]
    public decimal TotalAmount { get; init; }
    [Required]
    public required PaymentMethods PaymentMethod { get; init; }
    [Required]
    public int CustomerId { get; init; }
    [Required]
    public int UserId { get; init; }
    [Required]
    public int BranchId { get; init; }
    [Required]
    public int DeliveryAddressId { get; init; }

    [Required]
    public required ICollection<CreateFactorOrderInput> orders { get; init; }
}

