using API.GraphQL.Address.AddressInputs;
using FluentValidation.TestHelper;
using Server.GraphQL.Address.Validators;

namespace Tests.Validators.AddressValidators;



public class CreateAddressInputValidatorTests
{
    private readonly CreateAddressInputValidator _validator;

    public CreateAddressInputValidatorTests()
    {
        _validator = new CreateAddressInputValidator();
    }

    [Fact]
    public void Should_Pass_When_AllRequiredFieldsAreProvided()
    {
        // Arrange
        var input = new CreateAddressInput
        {
            AddressLine1 = "123 Main St",
            City = "Anytown",
            PostalCode = "12345",
            Country = "USA",
            CustomerId = 1 // Assuming CustomerId is Guid; adjust if it's a different type
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact]
    public void Should_Fail_When_AddressLine1_IsEmpty()
    {
        // Arrange
        var input = new CreateAddressInput
        {
            AddressLine1 = string.Empty,
            City = "Anytown",
            PostalCode = "12345",
            Country = "USA",
            CustomerId = 1
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.AddressLine1)
              .WithErrorMessage("'Address Line1' must not be empty.");
    }

    [Fact]
    public void Should_Fail_When_AddressLine1_IsNull()
    {
        // Arrange
        var input = new CreateAddressInput
        {
            AddressLine1 = null,
            City = "Anytown",
            PostalCode = "12345",
            Country = "USA",
            CustomerId = 1
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.AddressLine1);
    }

    [Fact]
    public void Should_Fail_When_City_IsEmpty()
    {
        // Arrange
        var input = new CreateAddressInput
        {
            AddressLine1 = "123 Main St",
            City = string.Empty,
            PostalCode = "12345",
            Country = "USA",
            CustomerId = 1
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.City);
    }

    [Fact]
    public void Should_Fail_When_PostalCode_IsEmpty()
    {
        // Arrange
        var input = new CreateAddressInput
        {
            AddressLine1 = "123 Main St",
            City = "Anytown",
            PostalCode = string.Empty,
            Country = "USA",
            CustomerId = 1
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.PostalCode);
    }

    [Fact]
    public void Should_Fail_When_Country_IsEmpty()
    {
        // Arrange
        var input = new CreateAddressInput
        {
            AddressLine1 = "123 Main St",
            City = "Anytown",
            PostalCode = "12345",
            Country = string.Empty,
            CustomerId = 1
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.Country);
    }

    [Fact]
    public void Should_Fail_When_CustomerId_IsEmpty()
    {
        // Arrange
        var input = new CreateAddressInput
        {
            AddressLine1 = "123 Main St",
            City = "Anytown",
            PostalCode = "12345",
            Country = "USA",
            CustomerId = 0 // Assuming Guid; for other types, use default empty value
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.CustomerId);
    }

    [Fact]
    public void Should_Fail_WithMultipleErrors_When_MultipleFieldsAreInvalid()
    {
        // Arrange
        var input = new CreateAddressInput
        {
            AddressLine1 = string.Empty,
            City = null,
            PostalCode = string.Empty,
            Country = null,
            CustomerId = 0
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        Assert.Equal(5, result.Errors.Count); // One for each required field
    }
}
