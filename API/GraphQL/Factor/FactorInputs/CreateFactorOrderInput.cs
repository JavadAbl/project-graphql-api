

namespace Server.GraphQL.Factor.FactorInputs;

public record CreateFactorOrderInput
{

    public int Count { get; set; }

    public int ProductId { get; set; }
}
