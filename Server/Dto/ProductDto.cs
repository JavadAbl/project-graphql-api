namespace API.Dto;

public record ProductDto(
    int Id,
    string Name,
    string Description,
    string SKU,
    decimal Price,
    int StockQuantity);
