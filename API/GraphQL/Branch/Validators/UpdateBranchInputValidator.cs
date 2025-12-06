using System.Linq.Expressions;
using API.GraphQL.Branch.BranchInputs;
using FluentValidation;

namespace Server.GraphQL.Branch.Validators;

public class UpdateBranchInputValidator : AbstractValidator<UpdateBranchInput>
{
    public UpdateBranchInputValidator()
    {
        var stringProperties = new Expression<Func<UpdateBranchInput, string?>>[]
        {
            x => x.Phone,
            x => x.Location,
        };

        foreach (var prop in stringProperties)
        {
            RuleFor(prop)
                .NotEmpty()
                .When((model) =>
                {
                    var value = prop.Compile()(model);
                    return value != null;
                });
        }

        RuleFor(x => x.Name)
                        .NotEmpty()
                        .Length(1, 20)
                     .When((model, value) => model.Name != null);
    }
}
