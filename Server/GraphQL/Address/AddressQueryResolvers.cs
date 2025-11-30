using API.Dto;
using API.GraphQL.Address.AddressInputs;
using API.Interfaces.Services;

namespace API.GraphQL.Address;


[ExtendObjectType(typeof(Query))]
public class AddressQueryResolvers
{
    public Task<IEnumerable<AddressDto>> GetAddresses([Service] IAddressService addressService)
    {
        return addressService.GetMany();
    }

    public async Task<AddressDto?> GetAddressById(int id, [Service] IAddressService addressService)
    {
        return await addressService.GetById(id);
    }

    public async Task<CustomerDto> GetCustomer([Parent] CustomerDto customer,
     [Service] IAddressService addressService)
    {
        return await addressService.Create(input);
    }

}