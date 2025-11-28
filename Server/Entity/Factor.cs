namespace Entity;

public class Factor
{
    public int Id { get; set; }
    public int CustomerID { get; set; }
    public int BranchID { get; set; }
    public int? DeliveryAddressID { get; set; }

    public DateTime FactorDate { get; set; }
    public decimal TotalAmount { get; set; }
    public string PaymentMethod { get; set; }
    public string Status { get; set; }

    // --- Navigation Properties ---
    public virtual Customer Customer { get; set; }
    public virtual User User { get; set; }
    public int UserId { get; set; }
    public virtual Branch Branch { get; set; }
    public virtual Address DeliveryAddress { get; set; }
    public virtual ICollection<FactorOrder> FactorOrders { get; set; }
}