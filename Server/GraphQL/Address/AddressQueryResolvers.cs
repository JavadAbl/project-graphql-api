using API.Dto;
using API.Interfaces.Services;
using Microsoft.EntityFrameworkCore;

namespace API.GraphQL.Address;


[ExtendObjectType(typeof(Query))]
public class FactorQueryResolvers
{
    [UseProjection]
    public Task<List<AddressDto>> GetAddresses([Service] IAddressService addressService)
    {
        return addressService.GetMany().ToListAsync();
    }

    [UseProjection]
    public Task<AddressDto?> GetAddressById(int id, [Service] IAddressService addressService)
    {
        return addressService.GetById(id).FirstOrDefaultAsync();
    }

    public async Task<CustomerDto> GetCustomer([Parent] CustomerDto customer,
     [Service] IAddressService addressService)
    {
        return await addressService.GetCustomer(customer.Id);
    }

}