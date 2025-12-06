using API.Dto;
using API.GraphQL.Factor.FactorInputs;
using API.Interfaces.Services;
using AppAny.HotChocolate.FluentValidation;

namespace API.GraphQL.Factor;

public class FactorMutationResolvers
{
  public async Task<FactorDto> CreateFactor(
    [UseFluentValidation] CreateFactorInput input,
    [Service] IFactorService factorService) =>
    await factorService.Create(input);

}

