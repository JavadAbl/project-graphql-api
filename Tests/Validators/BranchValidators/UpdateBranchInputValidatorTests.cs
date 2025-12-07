
using API.GraphQL.Branch.BranchInputs;
using FluentValidation.TestHelper;
using Server.GraphQL.Branch.Validators;

namespace Tests.Validators.BranchValidators;

public class UpdateBranchInputValidatorTests
{
    private readonly UpdateBranchInputValidator _validator = new();

    private UpdateBranchInput ValidInput => new()
    {
        Name = "East Branch",
        Phone = "555‑222‑3333",
        Location = "456 East Rd, Metropolis"
    };

    [Fact]
    public void All_Provided_Fields_Should_Pass_When_Valid()
    {
        var result = _validator.TestValidate(ValidInput);
        result.ShouldNotHaveAnyValidationErrors();
    }

    #region Name tests (optional, length‑restricted)

    [Theory]
    [InlineData(null)]               // omitted → validation skipped
    [InlineData("")]
    [InlineData("   ")]
    public void Name_Should_Fail_When_NotNull_And_Empty(string value)
    {
        var input = ValidInput with { Name = value };
        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Name_Should_Skip_Validation_When_Null()
    {
        var input = ValidInput with { Name = null };
        var result = _validator.TestValidate(input);
        result.ShouldNotHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Name_Should_Fail_When_Too_Long()
    {
        var longName = new string('A', 21); // > 20 chars
        var input = ValidInput with { Name = longName };
        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Name_Should_Pass_When_Exactly_20_Chars()
    {
        var name20 = new string('B', 20);
        var input = ValidInput with { Name = name20 };
        var result = _validator.TestValidate(input);
        result.ShouldNotHaveValidationErrorFor(x => x.Name);
    }

    #endregion

    #region Phone tests (optional, not‑empty when supplied)

    [Theory]
    [InlineData(null)]               // omitted → validation skipped
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

    #region Location tests (optional, not‑empty when supplied)

    [Theory]
    [InlineData(null)]               // omitted → validation skipped
    [InlineData("")]
    [InlineData("   ")]
    public void Location_Should_Fail_When_NotNull_And_Empty(string value)
    {
        var input = ValidInput with { Location = value };
        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(x => x.Location);
    }

    [Fact]
    public void Location_Should_Skip_Validation_When_Null()
    {
        var input = ValidInput with { Location = null };
        var result = _validator.TestValidate(input);
        result.ShouldNotHaveValidationErrorFor(x => x.Location);
    }

    #endregion
}
