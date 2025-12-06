namespace API.Entity;

public class FactorOrder
{
    public int Id { get; set; }
    public int Count { get; set; }

    // --- Navigation Properties ---
    public virtual Factor Factor { get; set; } = null!;
    public int FactorId { get; set; }

    public virtual Product Product { get; set; } = null!;
    public int ProductId { get; set; }
}
