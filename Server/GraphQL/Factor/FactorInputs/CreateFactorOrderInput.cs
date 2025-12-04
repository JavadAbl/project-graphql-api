
using System.ComponentModel.DataAnnotations;

namespace Server.GraphQL.Factor.FactorInputs;

public record CreateFactorOrderInput
{
    [Required]
    public int Count { get; set; }
    [Required]
    public int ProductId { get; set; }
}
