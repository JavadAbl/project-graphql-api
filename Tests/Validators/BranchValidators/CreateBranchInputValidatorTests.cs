using API.GraphQL.Branch.BranchInputs;
using FluentValidation.TestHelper;
using Server.GraphQL.Branch.Validators;

namespace Tests.Validators.BranchValidators;

public class CreateBranchInputValidatorTests
{
    private readonly CreateBranchInputValidator _validator = new();

    private CreateBranchInput ValidInput => new()
    {
        Name = "Main Office",
        Phone = "555‑111‑2222",
        Location = "123 Main St, Springfield"
    };

    [Fact]
    public void All_Valid_Fields_Should_Pass()
    {
        var result = _validator.TestValidate(ValidInput);
        result.ShouldNotHaveAnyValidationErrors();
    }

    #region Name tests

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Name_Should_Fail_When_Empty(string value)
    {
        var input = ValidInput with { Name = value };
        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Name_Should_Fail_When_Too_Long()
    {
        var longName = new string('A', 21); // exceeds max length of 20
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

    #region Phone tests

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

    #endregion

    #region Location tests

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Location_Should_Fail_When_Empty(string value)
    {
        var input = ValidInput with { Location = value };
        var result = _validator.TestValidate(input);
        result.ShouldHaveValidationErrorFor(x => x.Location);
    }

    #endregion
}
