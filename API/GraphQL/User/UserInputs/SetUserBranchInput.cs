using System.ComponentModel.DataAnnotations;

namespace API.GraphQL.User.UserInputs;

public record SetUserBranchInput
{
    public int BranchId { get; init; }
}

