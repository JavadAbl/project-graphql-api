using System.ComponentModel.DataAnnotations;

namespace API.GraphQL.Branch.BranchInputs;

public record CreateBranchInput
{

    [Required]
    public required string Name { get; init; }

    [Required]
    public required string Phone { get; init; }

    [Required]
    public required string Location { get; init; }

}

