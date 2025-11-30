using API.Dto;
using API.GraphQL.Address.AddressInputs;
using API.Interfaces.Services;

namespace API.GraphQL.Address;

[ExtendObjectType(typeof(Mutation))]
public class FactorMutationResolvers
{
  public async Task<AddressDto> CreateAddress(
    CreateAddressInput input,
    [Service] IAddressService addressService) =>
    await addressService.Create(input);

  public async Task<AddressDto?> UpdateAddress(
       int id,
       UpdateAddressInput input,
       [Service] IAddressService addressService) =>
       await addressService.Update(id, input);


  public async Task<bool> DeleteAddress(
      int id,
      [Service] IAddressService addressService) =>
      await addressService.Delete(id);

}

