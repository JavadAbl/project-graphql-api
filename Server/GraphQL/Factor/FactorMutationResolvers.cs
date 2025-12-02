using API.Dto;
using API.GraphQL.Factor.FactorInputs;
using API.Interfaces.Services;

namespace API.GraphQL.Factor;

public class FactorMutationResolvers
{
  public async Task<FactorDto> CreateFactor(
    CreateFactorInput input,
    [Service] IFactorService factorService) =>
    await factorService.Create(input);

}

