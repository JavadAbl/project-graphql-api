using System.Linq.Expressions;
using API.GraphQL.Address.AddressInputs;
using FluentValidation;

namespace API.GraphQL.Address.Validators;

public class UpdateAddressInputValidator : AbstractValidator<UpdateAddressInput>
{
    public UpdateAddressInputValidator()
    {
        var stringProperties = new Expression<Func<UpdateAddressInput, string?>>[]
        {
            x => x.AddressLine1,
            x => x.AddressLine2,
            x => x.City,
            x => x.State,
            x => x.PostalCode,
            x => x.Country,
            x => x.AddressType
        };

        foreach (var prop in stringProperties)
        {
            RuleFor(prop)
                .NotEmpty()
                .When((model) =>
                {
                    // Compile the expression to read the property value from the model
                    var value = prop.Compile()(model);
                    Console.WriteLine(value);
                    return value != null;
                });
        }
    }
}