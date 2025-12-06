using API.Enums;

namespace API.GraphQL.User.UserInputs;

public record CreateUserInput
{
    public required string FirstName { get; init; }

    public required string LastName { get; init; }

    public required string Username { get; init; }

    public required string Password { get; init; }

    public required UserRoles Role { get; init; }

    public int? BranchId { get; init; }
}

