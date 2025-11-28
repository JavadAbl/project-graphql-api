using System.ComponentModel.DataAnnotations;

namespace API.GraphQL.User.UserInputs;

public record SetUserBranchInput
{
    [Required]
    public int BranchId { get; init; }
}

