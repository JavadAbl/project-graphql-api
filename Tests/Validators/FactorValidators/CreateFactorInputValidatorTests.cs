namespace Tests.Validators.FactorValidators;

using API.GraphQL.Factor.FactorInputs;
using API.GraphQL.Factor.Validators;
using FluentValidation.TestHelper;
using Server.Enums;
using Server.GraphQL.Factor.FactorInputs;
using Xunit;


public class CreateFactorInputValidatorTests
{
    private readonly CreateFactorInputValidator _validator = new();

    private CreateFactorInput ValidInput => new()
    {
        PaymentMethod = PaymentMethods.CardToCard,
        CustomerId = 1,
        UserId = 2,
        BranchId = 3,
        DeliveryAddressId = 4,
        orders = new[]
        {
            new CreateFactorOrderInput { ProductId = 10, Count = 1 },
            new CreateFactorOrderInput { ProductId = 20, Count = 2 }
        }
    };

    [Fact]
    public void All_Valid_Fields_Should_Pass()
    {
        var result = _validator.TestValidate(ValidInput);
        result.ShouldNotHaveAnyValidationErrors();
    }

    #region PaymentMethod tests

    [Fact]
    public void PaymentMethod_Should_Fail_When_Invalid_Enum_Value()
    {
        var input = ValidInput with { PaymentMethod = (PaymentMethods)999 };
        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(x => x.PaymentMethod);
    }

    #endregion

    #region Id fields (must be non‑zero)

    [Theory]
    [InlineData(nameof(CreateFactorInput.CustomerId))]
    [InlineData(nameof(CreateFactorInput.UserId))]
    [InlineData(nameof(CreateFactorInput.BranchId))]
    [InlineData(nameof(CreateFactorInput.DeliveryAddressId))]
    public void Id_Should_Fail_When_Zero(string propertyName)
    {
        var input = propertyName switch
        {
            nameof(CreateFactorInput.CustomerId) => ValidInput with { CustomerId = 0 },
            nameof(CreateFactorInput.UserId) => ValidInput with { UserId = 0 },
            nameof(CreateFactorInput.BranchId) => ValidInput with { BranchId = 0 },
            nameof(CreateFactorInput.DeliveryAddressId) => ValidInput with { DeliveryAddressId = 0 },
            _ => ValidInput
        };

        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(propertyName);
    }

    #endregion

    #region Orders collection tests

    [Fact]
    public void Orders_Should_Fail_When_Empty()
    {
        var input = ValidInput with { orders = Array.Empty<CreateFactorOrderInput>() };
        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(x => x.orders);
    }

    [Fact]
    public void Orders_Should_Fail_When_Null()
    {
        var input = ValidInput with { orders = null! };
        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(x => x.orders);
    }

    [Fact]
    public void Orders_Should_Propagate_Order_Validation_Errors()
    {
        var badOrder = new CreateFactorOrderInput { ProductId = 0, Count = 0 };
        var input = ValidInput with { orders = new[] { badOrder } };
        var result = _validator.TestValidate(input);

        result.ShouldHaveValidationErrorFor("orders[0].ProductId");
        result.ShouldHaveValidationErrorFor("orders[0].Count");
    }

    #endregion
}

