using System.ComponentModel.DataAnnotations;

namespace API.GraphQL.Address.AddressInputs;

public record CreateAddressInput
{
    public required string AddressLine1 { get; init; }

    public string? AddressLine2 { get; init; }

    public required string City { get; init; }

    public string? State { get; init; }

    public required string PostalCode { get; init; }

    public required string Country { get; init; }

    public string? AddressType { get; init; }

    public int CustomerId { get; init; }

}

