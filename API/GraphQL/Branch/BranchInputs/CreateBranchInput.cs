
namespace API.GraphQL.Branch.BranchInputs;

public record CreateBranchInput
{
    public required string Name { get; init; }

    public required string Phone { get; init; }

    public required string Location { get; init; }
}

