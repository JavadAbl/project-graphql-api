using System.Linq.Expressions;
using API.GraphQL.User.UserInputs;
using FluentValidation;

namespace Server.GraphQL.User.Validators;

public class UpdateUserInputValidator : AbstractValidator<UpdateUserInput>
{
    public UpdateUserInputValidator()
    {
        var stringProperties = new Expression<Func<UpdateUserInput, string?>>[]
        {
            x => x.FirstName,
            x => x.LastName,
            x=> x.Username,
        };

        foreach (var prop in stringProperties)
        {
            RuleFor(prop)
                .NotEmpty()
                .When((model) => prop.Compile()(model) != null);
        }

        RuleFor(x => x.Role)
                .IsInEnum()
                .When((model, value) => model.IsActive != null);
    }
}
