using API.GraphQL.Factor.FactorInputs;
using FluentValidation;

namespace API.GraphQL.Factor.Validators;


public class CreateFactorInputValidator : AbstractValidator<CreateFactorInput>
{
    public CreateFactorInputValidator()
    {
        RuleFor(x => x.PaymentMethod)
            .IsInEnum();

        RuleFor(x => x.CustomerId)
            .NotEmpty();

        RuleFor(x => x.UserId)
            .NotEmpty();

        RuleFor(x => x.BranchId)
            .NotEmpty();

        RuleFor(x => x.DeliveryAddressId)
            .NotEmpty();

        RuleFor(x => x.orders)
            .NotEmpty()
            .ForEach(order =>
            {
                order.SetValidator(new CreateFactorOrderInputValidator());
            });
    }
}