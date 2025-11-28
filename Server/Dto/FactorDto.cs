namespace API.Dto;

public record FactorDto(
    int Id,
    int CustomerId,
    int BranchId,
    int? DeliveryAddressId,
    DateTime FactorDate,
    decimal TotalAmount,
    string PaymentMethod,
    string Status,
    int UserId);
