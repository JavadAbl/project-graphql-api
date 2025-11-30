using System.ComponentModel.DataAnnotations;

namespace API.GraphQL.Address.AddressInputs;

public record CreateAddressInput
{
    [Required]
    public required string AddressLine1 { get; init; }

    public string? AddressLine2 { get; init; }

    [Required]
    public required string City { get; init; }

    public string? State { get; init; }

    [Required]
    public required string PostalCode { get; init; }

    [Required]
    public required string Country { get; init; }

    [Required]
    public required string AddressType { get; init; }

    [Required]
    public int CustomerId { get; init; }

}

