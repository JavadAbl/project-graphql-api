namespace API.Entity;

public class FactorOrder
{
    public int Id { get; set; }
    public int Count { get; set; }

    // --- Navigation Properties ---
    public virtual required Factor Factor { get; set; }
    public int FactorId { get; set; }

    public virtual required Product Product { get; set; }
    public int ProductId { get; set; }
}
