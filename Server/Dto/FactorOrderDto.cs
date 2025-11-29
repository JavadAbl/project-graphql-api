namespace API.Dto;

public class FactorOrderDto
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public required ProductDto Product { get; set; }
    public required FactorDto Factor { get; set; }
}


