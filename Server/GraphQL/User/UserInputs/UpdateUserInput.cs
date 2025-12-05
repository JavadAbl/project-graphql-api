using API.Enums;

namespace API.GraphQL.User.UserInputs;

public record UpdateUserInput
{
    public string? FirstName { get; init; }

    public string? LastName { get; init; }

    public string? Username { get; init; }

    public UserRoles? Role { get; init; }

    public byte? IsActive { get; init; }

}

