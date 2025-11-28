namespace Entity;

public class Branch
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Phone { get; set; }
    public required string Location { get; set; }

    // --- Navigation Properties ---
    public virtual ICollection<User> Users { get; set; } = [];
    public virtual ICollection<Factor> Factors { get; set; } = [];
}