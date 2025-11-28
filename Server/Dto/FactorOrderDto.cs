namespace API.Dto;

public record FactorOrderDto(
    int Id,
    int FactorId,
    int ProductId,
    int Quantity,
    decimal UnitPrice);

