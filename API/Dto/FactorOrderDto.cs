namespace API.Dto;

public class FactorOrderDto
{
    [IsProjected]
    public int Id { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public ProductDto? Product { get; set; }
    public FactorDto? Factor { get; set; }
}


