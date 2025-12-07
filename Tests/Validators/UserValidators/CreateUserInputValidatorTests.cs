

using API.Enums;
using API.GraphQL.User.UserInputs;
using FluentValidation.TestHelper;
using Server.GraphQL.User.Validators;

namespace Tests.Validators.UserValidators;


public class CreateUserInputValidatorTests
{
    private readonly CreateUserInputValidator _validator;

    public CreateUserInputValidatorTests()
    {
        _validator = new CreateUserInputValidator();
    }

    [Fact]
    public void Should_Pass_When_AllRequiredFieldsAreProvided_And_RoleIsValid()
    {
        // Arrange
        var input = new CreateUserInput
        {
            FirstName = "John",
            LastName = "Doe",
            Username = "johndoe",
            Password = "securepassword",
            Role = UserRoles.Operator
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact]
    public void Should_Fail_When_FirstName_IsEmpty()
    {
        // Arrange
        var input = new CreateUserInput
        {
            FirstName = string.Empty,
            LastName = "Doe",
            Username = "johndoe",
            Password = "securepassword",
            Role = UserRoles.Operator
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.FirstName)
              .WithErrorMessage("'First Name' must not be empty.");
    }

    [Fact]
    public void Should_Fail_When_FirstName_IsNull()
    {
        // Arrange
        var input = new CreateUserInput
        {
            FirstName = null,
            LastName = "Doe",
            Username = "johndoe",
            Password = "securepassword",
            Role = UserRoles.Operator
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.FirstName);
    }

    [Fact]
    public void Should_Fail_When_LastName_IsEmpty()
    {
        // Arrange
        var input = new CreateUserInput
        {
            FirstName = "John",
            LastName = string.Empty,
            Username = "johndoe",
            Password = "securepassword",
            Role = UserRoles.Operator
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.LastName)
              .WithErrorMessage("'Last Name' must not be empty.");
    }

    [Fact]
    public void Should_Fail_When_Username_IsEmpty()
    {
        // Arrange
        var input = new CreateUserInput
        {
            FirstName = "John",
            LastName = "Doe",
            Username = string.Empty,
            Password = "securepassword",
            Role = UserRoles.Operator
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.Username)
              .WithErrorMessage("'Username' must not be empty.");
    }

    [Fact]
    public void Should_Fail_When_Password_IsEmpty()
    {
        // Arrange
        var input = new CreateUserInput
        {
            FirstName = "John",
            LastName = "Doe",
            Username = "johndoe",
            Password = string.Empty,
            Role = UserRoles.Operator
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.Password)
              .WithErrorMessage("'Password' must not be empty.");
    }

    [Fact]
    public void Should_Fail_When_Role_IsInvalid()
    {
        // Arrange
        var input = new CreateUserInput
        {
            FirstName = "John",
            LastName = "Doe",
            Username = "johndoe",
            Password = "securepassword",
            Role = (UserRoles)999 // Assuming 999 is not a defined value in the enum; adjust if needed
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.Role)
              .WithErrorMessage("'Role' has a range of values which does not include '999'."); // Adjust '999' if using a different invalid value
    }

    [Fact]
    public void Should_Fail_WithMultipleErrors_When_MultipleFieldsAreInvalid()
    {
        // Arrange
        var input = new CreateUserInput
        {
            FirstName = string.Empty,
            LastName = null,
            Username = string.Empty,
            Password = null,
            Role = (UserRoles)999
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        Assert.Equal(5, result.Errors.Count); // One for each required field and the role
    }
}


