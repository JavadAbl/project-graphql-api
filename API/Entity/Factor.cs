using Server.Enums;

namespace API.Entity;

public class Factor
{
    public int Id { get; set; }
    public DateTime FactorDate { get; set; } = DateTime.Now;
    public decimal TotalAmount { get; set; }
    public required PaymentMethods PaymentMethod { get; set; }
    public FactorStatus Status { get; set; } = FactorStatus.Pending;


    // --- Navigation Properties ---
    public virtual Customer Customer { get; set; } = null!;
    public int CustomerId { get; set; }

    public virtual User User { get; set; } = null!;
    public int UserId { get; set; }

    public virtual Branch Branch { get; set; } = null!;
    public int BranchId { get; set; }

    public virtual Address DeliveryAddress { get; set; } = null!;
    public int DeliveryAddressId { get; set; }

    public virtual ICollection<FactorOrder> FactorOrders { get; set; } = null!;
}