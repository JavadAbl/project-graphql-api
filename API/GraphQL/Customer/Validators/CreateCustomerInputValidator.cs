using System.Linq.Expressions;
using API.GraphQL.Customer.CustomerInputs;
using FluentValidation;

namespace API.GraphQL.Customer.Validators;

public class CreateCustomerInputValidator : AbstractValidator<CreateCustomerInput>
{
    public CreateCustomerInputValidator()
    {
        var requiredProperties = new Expression<Func<CreateCustomerInput, string>>[]
        {
            x => x.FirstName,
            x => x.LastName,
            x => x.Email,
            x => x.Phone
        };

        foreach (var prop in requiredProperties)
        {
            RuleFor(prop)
                .NotEmpty();
        }

        RuleFor(x => x.Email)
            .EmailAddress();

    }
}