using System.ComponentModel.DataAnnotations;

namespace API.GraphQL.Customer.CustomerInputs;

public record CreateCustomerInput
{

    [Required]
    public required string FirstName { get; init; }

    [Required]
    public required string LastName { get; init; }

    [Required]
    public required string Email { get; init; }

    [Required]
    public required string Phone { get; init; }

}

