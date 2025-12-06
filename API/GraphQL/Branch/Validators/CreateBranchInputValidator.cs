

using API.GraphQL.Branch.BranchInputs;
using FluentValidation;

namespace Server.GraphQL.Branch.Validators;

public class CreateBranchInputValidator : AbstractValidator<CreateBranchInput>
{
    public CreateBranchInputValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .Length(1, 20);

        RuleFor(x => x.Phone).NotEmpty();

        RuleFor(x => x.Location).NotEmpty();
    }
}
