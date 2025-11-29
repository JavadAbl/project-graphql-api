namespace Entity;

public class User
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Username { get; set; }
    public required string PasswordHash { get; set; }
    public required string Role { get; set; }
    public bool IsActive { get; set; } = false;


    // --- Navigation Properties ---
    public virtual Branch? Branch { get; set; }
    public int? BranchId { get; set; }

    public virtual ICollection<Factor> CreatedFactors { get; set; } = [];
}