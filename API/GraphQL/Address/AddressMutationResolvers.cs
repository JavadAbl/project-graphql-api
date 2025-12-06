using API.Dto;
using API.GraphQL.Address.AddressInputs;
using API.Interfaces.Services;
using AppAny.HotChocolate.FluentValidation;

namespace API.GraphQL.Address;

public class AddressMutationResolvers
{
  public async Task<AddressDto> CreateAddress(
   [UseFluentValidation] CreateAddressInput input,
    [Service] IAddressService addressService) =>
    await addressService.Create(input);

  public async Task<AddressDto?> UpdateAddress(
       int id,
     [UseFluentValidation] UpdateAddressInput input,
       [Service] IAddressService addressService) =>
       await addressService.Update(id, input);


  public async Task<bool> DeleteAddress(
      int id,
      [Service] IAddressService addressService) =>
      await addressService.Delete(id);

}

