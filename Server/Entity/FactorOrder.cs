namespace API.Entity;

public class FactorOrder
{
    public int Id { get; set; }
    public int FactorID { get; set; }
    public int ProductID { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }

    // --- Navigation Properties ---
    public virtual Factor Factor { get; set; }
    public virtual Product Product { get; set; }
}
