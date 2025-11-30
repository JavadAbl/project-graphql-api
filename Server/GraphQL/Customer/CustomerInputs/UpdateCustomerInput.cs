namespace API.GraphQL.Customer.CustomerInputs;

public record UpdateCustomerInput
{
    public string? FirstName { get; init; }


    public string? LastName { get; init; }


    public string? Email { get; init; }


    public string? Phone { get; init; }
}

