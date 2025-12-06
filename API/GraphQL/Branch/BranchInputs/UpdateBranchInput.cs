namespace API.GraphQL.Branch.BranchInputs;

public record UpdateBranchInput
{
    public string? Name { get; init; }

    public string? Phone { get; init; }

    public string? Location { get; init; }
}

