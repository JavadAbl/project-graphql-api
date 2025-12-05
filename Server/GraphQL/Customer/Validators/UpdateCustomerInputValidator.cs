using System.Linq.Expressions;
using API.GraphQL.Customer.CustomerInputs;
using FluentValidation;

namespace API.GraphQL.Customer.Validators;

public class UpdateCustomerInputValidator : AbstractValidator<UpdateCustomerInput>
{
    public UpdateCustomerInputValidator()
    {
        var requiredProperties = new Expression<Func<UpdateCustomerInput, string?>>[]
        {
            x => x.FirstName,
            x => x.LastName,
            x => x.Email,
            x => x.Phone
        };

        foreach (var prop in requiredProperties)
        {
            RuleFor(prop)
                .NotEmpty()
                .When(model => prop.Compile()(model) != null);
        }

        RuleFor(x => x.Email)
            .EmailAddress()
            .When(model => model.Email != null); ;

    }
}