using API.GraphQL.User.UserInputs;
using FluentValidation;

namespace Server.GraphQL.User.Validators;

public class SetUserBranchInputValidator : AbstractValidator<SetUserBranchInput>
{
    public SetUserBranchInputValidator()
    {
        RuleFor(x => x.BranchId).NotEmpty();
    }
}
