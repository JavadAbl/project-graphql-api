namespace API.GraphQL.Address.AddressInputs;

public record UpdateAddressInput
{
    public string? AddressLine1 { get; init; }

    public string? AddressLine2 { get; init; }

    public string? City { get; init; }

    public string? State { get; init; }

    public string? PostalCode { get; init; }

    public string? Country { get; init; }

    public string? AddressType { get; init; }
}

