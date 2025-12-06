using System.Linq.Expressions;
using API.GraphQL.User.UserInputs;
using FluentValidation;

namespace Server.GraphQL.User.Validators;

public class CreateUserInputValidator : AbstractValidator<CreateUserInput>
{
    public CreateUserInputValidator()
    {
        var stringProperties = new Expression<Func<CreateUserInput, string?>>[]
        {
            x => x.FirstName,
            x => x.LastName,
            x=> x.Username,
            x=>x.Password,
        };

        foreach (var prop in stringProperties)
        {
            RuleFor(prop).NotEmpty();
        }

        RuleFor(x => x.Role).IsInEnum();
    }
}
