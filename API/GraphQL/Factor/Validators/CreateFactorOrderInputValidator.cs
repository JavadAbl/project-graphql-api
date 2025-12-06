using FluentValidation;
using Server.GraphQL.Factor.FactorInputs;

namespace API.GraphQL.Factor.Validators;


public class CreateFactorOrderInputValidator : AbstractValidator<CreateFactorOrderInput>
{
    public CreateFactorOrderInputValidator()
    {
        RuleFor(x => x.ProductId)
            .NotEmpty();

        RuleFor(x => x.Count)
             .NotEmpty();
    }
}