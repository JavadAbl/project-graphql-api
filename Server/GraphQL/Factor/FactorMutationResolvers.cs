using API.Dto;
using API.GraphQL.Factor.FactorInputs;

namespace API.GraphQL.Factor;

[ExtendObjectType(typeof(Mutation))]
public class FactorMutationResolvers
{
    public async Task<FactorDto> CreateFactor(
      CreateFactorInput input,
      [Service] IFactorService factorService) =>
      await factorService.Create(input);

}

