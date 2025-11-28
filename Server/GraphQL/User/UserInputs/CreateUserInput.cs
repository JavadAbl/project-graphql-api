using System.ComponentModel.DataAnnotations;

namespace API.GraphQL.User.UserInputs;

public record CreateUserInput
{

    [Required]
    public required string FirstName { get; init; }

    [Required]
    public required string LastName { get; init; }

    [Required]
    public required string Username { get; init; }

    [Required]
    public required string Password { get; init; }

    [Required]
    public required string Role { get; init; }

    public int? BranchId { get; init; }
}

