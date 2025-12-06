using Server.Enums;
using Server.GraphQL.Factor.FactorInputs;

namespace API.GraphQL.Factor.FactorInputs;

public record CreateFactorInput
{
    public required PaymentMethods PaymentMethod { get; init; }

    public required int CustomerId { get; init; }

    public required int UserId { get; init; }

    public required int BranchId { get; init; }

    public required int DeliveryAddressId { get; init; }

    public required ICollection<CreateFactorOrderInput> orders { get; init; }
}

