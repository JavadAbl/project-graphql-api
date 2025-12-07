namespace Tests.Validators.CustomerValidators;

using API.GraphQL.Customer.CustomerInputs;
using API.GraphQL.Customer.Validators;
using FluentValidation.TestHelper;
using Xunit;

public class UpdateCustomerInputValidatorTests
{
    private readonly UpdateCustomerInputValidator _validator = new();

    private UpdateCustomerInput ValidInput => new()
    {
        FirstName = "John",
        LastName = "Doe",
        Email = "john.doe@example.com",
        Phone = "555‑987‑6543"
    };

    [Fact]
    public void All_Provided_Fields_Should_Pass_When_Valid()
    {
        var result = _validator.TestValidate(ValidInput);
        result.ShouldNotHaveAnyValidationErrors();
    }

    #region Required‑when‑not‑null tests

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void FirstName_Should_Fail_When_NotNull_And_Empty(string value)
    {
        var input = ValidInput with { FirstName = value };
        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(x => x.FirstName);
    }

    [Fact]
    public void FirstName_Should_Skip_Validation_When_Null()
    {
        var input = ValidInput with { FirstName = null };
        var result = _validator.TestValidate(input);
        result.ShouldNotHaveValidationErrorFor(x => x.FirstName);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void LastName_Should_Fail_When_NotNull_And_Empty(string value)
    {
        var input = ValidInput with { LastName = value };
        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(x => x.LastName);
    }

    [Fact]
    public void LastName_Should_Skip_Validation_When_Null()
    {
        var input = ValidInput with { LastName = null };
        var result = _validator.TestValidate(input);
        result.ShouldNotHaveValidationErrorFor(x => x.LastName);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Email_Should_Fail_When_NotNull_And_Empty(string value)
    {
        var input = ValidInput with { Email = value };
        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(x => x.Email);
    }

    [Fact]
    public void Email_Should_Skip_Required_Validation_When_Null()
    {
        var input = ValidInput with { Email = null };
        var result = _validator.TestValidate(input);
        result.ShouldNotHaveValidationErrorFor(x => x.Email);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Phone_Should_Fail_When_NotNull_And_Empty(string value)
    {
        var input = ValidInput with { Phone = value };
        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(x => x.Phone);
    }

    [Fact]
    public void Phone_Should_Skip_Validation_When_Null()
    {
        var input = ValidInput with { Phone = null };
        var result = _validator.TestValidate(input);
        result.ShouldNotHaveValidationErrorFor(x => x.Phone);
    }

    #endregion

    #region Email format tests

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

    [Fact]
    public void Email_Format_Validation_Is_Skipped_When_Email_Is_Null()
    {
        var input = ValidInput with { Email = null };
        var result = _validator.TestValidate(input);
        result.ShouldNotHaveValidationErrorFor(x => x.Email);
    }

    #endregion
}

