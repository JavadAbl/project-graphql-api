namespace API.Dto;

public class UserDto
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Username { get; set; }
    public required string Role { get; set; }
    public bool IsActive { get; set; } = false;
    public required BranchDto? Branch { get; set; }
}
