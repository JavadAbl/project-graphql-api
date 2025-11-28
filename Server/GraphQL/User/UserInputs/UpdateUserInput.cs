namespace API.GraphQL.User.UserInputs;

public record UpdateUserInput
{

    public string? FirstName { get; init; }

    public string? LastName { get; init; }

    public string? Username { get; init; }

    public string? Password { get; init; }

    public string? Role { get; init; }

}

