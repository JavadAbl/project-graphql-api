using API.GraphQL.Address.AddressInputs;
using API.GraphQL.Address.Validators;
using FluentValidation.TestHelper;

namespace Tests.Validators.AddressValidators;

public class UpdateAddressInputValidatorTests
{
    private readonly UpdateAddressInputValidator _validator;

    public UpdateAddressInputValidatorTests()
    {
        _validator = new UpdateAddressInputValidator();
    }

    [Fact]
    public void Should_Pass_When_AllFieldsAreNull()
    {
        // Arrange
        var input = new UpdateAddressInput
        {
            // All fields null by default
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
        var input = new UpdateAddressInput
        {
            AddressLine1 = "123 Main St",
            AddressLine2 = "Apt 4",
            City = "Anytown",
            State = "CA",
            PostalCode = "12345",
            Country = "USA",
            AddressType = "Home"
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact]
    public void Should_Fail_When_AddressLine1_IsEmptyString()
    {
        // Arrange
        var input = new UpdateAddressInput
        {
            AddressLine1 = string.Empty
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.AddressLine1)
              .WithErrorMessage("'Address Line1' must not be empty.");
    }

    [Fact]
    public void Should_Pass_When_AddressLine1_IsNull()
    {
        // Arrange
        var input = new UpdateAddressInput
        {
            AddressLine1 = null
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveValidationErrorFor(x => x.AddressLine1);
    }

    [Fact]
    public void Should_Fail_When_AddressLine2_IsEmptyString()
    {
        // Arrange
        var input = new UpdateAddressInput
        {
            AddressLine2 = string.Empty
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.AddressLine2)
              .WithErrorMessage("'Address Line2' must not be empty.");
    }

    [Fact]
    public void Should_Pass_When_AddressLine2_IsNull()
    {
        // Arrange
        var input = new UpdateAddressInput
        {
            AddressLine2 = null
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveValidationErrorFor(x => x.AddressLine2);
    }

    [Fact]
    public void Should_Fail_When_City_IsEmptyString()
    {
        // Arrange
        var input = new UpdateAddressInput
        {
            City = string.Empty
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.City)
              .WithErrorMessage("'City' must not be empty.");
    }

    [Fact]
    public void Should_Pass_When_City_IsNull()
    {
        // Arrange
        var input = new UpdateAddressInput
        {
            City = null
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveValidationErrorFor(x => x.City);
    }

    [Fact]
    public void Should_Fail_When_State_IsEmptyString()
    {
        // Arrange
        var input = new UpdateAddressInput
        {
            State = string.Empty
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.State)
              .WithErrorMessage("'State' must not be empty.");
    }

    [Fact]
    public void Should_Pass_When_State_IsNull()
    {
        // Arrange
        var input = new UpdateAddressInput
        {
            State = null
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveValidationErrorFor(x => x.State);
    }

    [Fact]
    public void Should_Fail_When_PostalCode_IsEmptyString()
    {
        // Arrange
        var input = new UpdateAddressInput
        {
            PostalCode = string.Empty
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.PostalCode)
              .WithErrorMessage("'Postal Code' must not be empty.");
    }

    [Fact]
    public void Should_Pass_When_PostalCode_IsNull()
    {
        // Arrange
        var input = new UpdateAddressInput
        {
            PostalCode = null
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveValidationErrorFor(x => x.PostalCode);
    }

    [Fact]
    public void Should_Fail_When_Country_IsEmptyString()
    {
        // Arrange
        var input = new UpdateAddressInput
        {
            Country = string.Empty
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.Country)
              .WithErrorMessage("'Country' must not be empty.");
    }

    [Fact]
    public void Should_Pass_When_Country_IsNull()
    {
        // Arrange
        var input = new UpdateAddressInput
        {
            Country = null
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveValidationErrorFor(x => x.Country);
    }

    [Fact]
    public void Should_Fail_When_AddressType_IsEmptyString()
    {
        // Arrange
        var input = new UpdateAddressInput
        {
            AddressType = string.Empty
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.AddressType)
              .WithErrorMessage("'Address Type' must not be empty.");
    }

    [Fact]
    public void Should_Pass_When_AddressType_IsNull()
    {
        // Arrange
        var input = new UpdateAddressInput
        {
            AddressType = null
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        result.ShouldNotHaveValidationErrorFor(x => x.AddressType);
    }

    [Fact]
    public void Should_Fail_WithMultipleErrors_When_MultipleStringFieldsAreEmptyStrings()
    {
        // Arrange
        var input = new UpdateAddressInput
        {
            AddressLine1 = string.Empty,
            AddressLine2 = string.Empty,
            City = string.Empty,
            State = string.Empty,
            PostalCode = string.Empty,
            Country = string.Empty,
            AddressType = string.Empty
        };

        // Act
        var result = _validator.TestValidate(input);

        // Assert
        Assert.Equal(7, result.Errors.Count); // One for each string property
    }
}
