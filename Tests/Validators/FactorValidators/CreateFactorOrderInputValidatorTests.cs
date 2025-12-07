using API.GraphQL.Factor.Validators;
using FluentValidation.TestHelper;
using Server.GraphQL.Factor.FactorInputs;


namespace Tests.Validators.FactorValidators;


public class CreateFactorOrderInputValidatorTests
{
    private readonly CreateFactorOrderInputValidator _validator = new();

    private CreateFactorOrderInput ValidOrder => new()
    {
        ProductId = 42,
        Count = 3
    };

    [Fact]
    public void Valid_Order_Should_Pass()
    {
        var result = _validator.TestValidate(ValidOrder);
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public void ProductId_Should_Fail_When_NonPositive(int value)
    {
        var order = ValidOrder with { ProductId = value };
        var result = _validator.TestValidate(order);
        result.ShouldHaveValidationErrorFor(x => x.ProductId);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-5)]
    public void Count_Should_Fail_When_NonPositive(int value)
    {
        var order = ValidOrder with { Count = value };
        var result = _validator.TestValidate(order);
        result.ShouldHaveValidationErrorFor(x => x.Count);
    }
}

