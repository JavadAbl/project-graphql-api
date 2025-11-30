namespace Entity;

public class Customer
{
    public int Id { get; set; }

    public required string FirstName { get; set; }

    public required string LastName { get; set; }

    public required string Email { get; set; }

    public required string Phone { get; set; }

    // --- Navigation Properties ---

    public virtual ICollection<Address> Addresses { get; set; } = [];

    public virtual ICollection<Factor> Factors { get; set; } = [];
}