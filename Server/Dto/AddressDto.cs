namespace API.Dto;

public record AddressDto(
    int Id,
    string AddressLine1,
    string? AddressLine2,
    string City,
    string State,
    string PostalCode,
    string Country,
    string AddressType,
    int CustomerId);


