using API.GraphQL.Customer.CustomerInputs;
using API.GraphQL.Customer.Validators;
using FluentValidation.TestHelper;

namespace Tests.Validators.CustomerValidators;

public class CreateCustomerInputValidatorTests
{
    private readonly CreateCustomerInputValidator _validator = new();

    private CreateCustomerInput ValidInput => new()
    {
        FirstName = "Jane",
        LastName = "Doe",
        Email = "jane.doe@example.com",
        Phone = "555‑123‑4567"
    };

    [Fact]
    public void All_Required_Fields_Should_Pass_When_Valid()
    {
        var result = _validator.TestValidate(ValidInput);
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void FirstName_Should_Fail_When_Empty(string value)
    {
        var input = ValidInput with { FirstName = value };
        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(x => x.FirstName);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void LastName_Should_Fail_When_Empty(string value)
    {
        var input = ValidInput with { LastName = value };
        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(x => x.LastName);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Email_Should_Fail_When_Empty(string value)
    {
        var input = ValidInput with { Email = value };
        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(x => x.Email);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Phone_Should_Fail_When_Empty(string value)
    {
        var input = ValidInput with { Phone = value };
        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(x => x.Phone);
    }

    [Theory]
    [InlineData("plainaddress")]
    [InlineData("missing@domain")]
    [InlineData("user@.com")]
    [InlineData("user@domain..com")]
    public void Email_Should_Fail_When_Invalid_Format(string email)
    {
        var input = ValidInput with { Email = email };
        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(x => x.Email)
              .WithErrorMessage("‘Email’ is not a valid email address.");
    }

    [Fact]
    public void Email_Should_Pass_When_Valid_Format()
    {
        var input = ValidInput with { Email = "valid.user+test@example.co.uk" };
        var result = _validator.TestValidate(input);
        result.ShouldNotHaveValidationErrorFor(x => x.Email);
    }
}

