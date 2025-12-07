

using API.Enums;
using API.GraphQL.User.UserInputs;
using FluentValidation.TestHelper;
using Server.GraphQL.User.Validators;

namespace Tests.Validators.UserValidators;

public class UpdateUserInputValidatorTests
{
    private readonly UpdateUserInputValidator _validator;

    public UpdateUserInputValidatorTests()
    {
        _validator = new UpdateUserInputValidator();
    }

    [Fact]
    public void Should_Pass_When_AllFieldsAreNull()
    {
        // Arrange
        var input = new UpdateUserInput
        {
            // All relevant fields null by default
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact]
    public void Should_Pass_When_StringFieldsAreProvidedAndNonEmpty()
    {
        // Arrange
        var input = new UpdateUserInput
        {
            FirstName = "John",
            LastName = "Doe",
            Username = "johndoe"
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact]
    public void Should_Fail_When_FirstName_IsEmptyString()
    {
        // Arrange
        var input = new UpdateUserInput
        {
            FirstName = string.Empty
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.FirstName)
              .WithErrorMessage("'First Name' must not be empty.");
    }

    [Fact]
    public void Should_Pass_When_FirstName_IsNull()
    {
        // Arrange
        var input = new UpdateUserInput
        {
            FirstName = null
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveValidationErrorFor(x => x.FirstName);
    }

    [Fact]
    public void Should_Fail_When_LastName_IsEmptyString()
    {
        // Arrange
        var input = new UpdateUserInput
        {
            LastName = string.Empty
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.LastName)
              .WithErrorMessage("'Last Name' must not be empty.");
    }

    [Fact]
    public void Should_Pass_When_LastName_IsNull()
    {
        // Arrange
        var input = new UpdateUserInput
        {
            LastName = null
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveValidationErrorFor(x => x.LastName);
    }

    [Fact]
    public void Should_Fail_When_Username_IsEmptyString()
    {
        // Arrange
        var input = new UpdateUserInput
        {
            Username = string.Empty
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.Username)
              .WithErrorMessage("'Username' must not be empty.");
    }

    [Fact]
    public void Should_Pass_When_Username_IsNull()
    {
        // Arrange
        var input = new UpdateUserInput
        {
            Username = null
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveValidationErrorFor(x => x.Username);
    }

    [Fact]
    public void Should_Pass_When_Role_IsValid_And_IsActive_IsNotNull()
    {
        // Arrange
        var input = new UpdateUserInput
        {
            Role = UserRoles.Operator,
            IsActive = true
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact]
    public void Should_Fail_When_Role_IsInvalid_And_IsActive_IsNotNull()
    {
        // Arrange
        var input = new UpdateUserInput
        {
            Role = (UserRoles)999,
            IsActive = true
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.Role)
              .WithErrorMessage("'Role' has a range of values which does not include '999'.");
    }

    [Fact]
    public void Should_Pass_When_Role_IsInvalid_And_IsActive_IsNull()
    {
        // Arrange
        var input = new UpdateUserInput
        {
            Role = (UserRoles)999,
            IsActive = null
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveValidationErrorFor(x => x.Role);
    }

    [Fact]
    public void Should_Pass_When_Role_IsValid_And_IsActive_IsNull()
    {
        // Arrange
        var input = new UpdateUserInput
        {
            Role = UserRoles.Operator,
            IsActive = null
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact]
    public void Should_Fail_WithMultipleErrors_When_MultipleStringFieldsAreEmptyStrings_And_RoleInvalidWithIsActiveSet()
    {
        // Arrange
        var input = new UpdateUserInput
        {
            FirstName = string.Empty,
            LastName = string.Empty,
            Username = string.Empty,
            Role = (UserRoles)999,
            IsActive = false
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        Assert.Equal(4, result.Errors.Count); // Three strings + Role
    }
}
