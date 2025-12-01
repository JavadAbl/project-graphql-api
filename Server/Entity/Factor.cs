namespace API.Entity;

public class Factor
{
    public int Id { get; set; }
    public DateTime FactorDate { get; set; } = DateTime.Now;
    public decimal TotalAmount { get; set; }
    public required string PaymentMethod { get; set; }
    public required string Status { get; set; }


    // --- Navigation Properties ---
    public virtual required Customer Customer { get; set; }
    public int CustomerId { get; set; }

    public virtual required User User { get; set; }
    public int UserId { get; set; }

    public virtual required Branch Branch { get; set; }
    public int BranchId { get; set; }

    public virtual required Address DeliveryAddress { get; set; }
    public int DeliveryAddressId { get; set; }

    public virtual required ICollection<FactorOrder> FactorOrders { get; set; }
}