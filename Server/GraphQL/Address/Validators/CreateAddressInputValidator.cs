using System.Linq.Expressions;
using API.GraphQL.Address.AddressInputs;
using FluentValidation;

namespace Server.GraphQL.Address.Validators;


public class CreateAddressInputValidator : AbstractValidator<CreateAddressInput>
{
    public CreateAddressInputValidator()
    {
        var stringProperties = new Expression<Func<CreateAddressInput, string?>>[]
    {
            x => x.AddressLine1,
            x => x.City,
            x => x.PostalCode,
            x => x.Country,
    };

        foreach (var prop in stringProperties)
        {
            RuleFor(prop)
                .NotEmpty();
        }

        RuleFor(x => x.CustomerId)
                      .NotEmpty();
    }
}
