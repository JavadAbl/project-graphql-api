using API.Dto;
using API.Interfaces.Services;
using Microsoft.EntityFrameworkCore;

namespace API.GraphQL.Address;

public class AddressQueryResolvers
{
    [UseOffsetPaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<AddressDto> GetAddresses([Service] IAddressService addressService)
    {
        return addressService.GetMany();
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<AddressDto?> GetAddressById(int id, [Service] IAddressService addressService)
    {
        return addressService.GetById(id);
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<CustomerDto> GetCustomer([Parent] CustomerDto customer,
       [Service] IAddressService addressService)
    {
        return addressService.GetAddressCustomer(customer.Id);
    }

}