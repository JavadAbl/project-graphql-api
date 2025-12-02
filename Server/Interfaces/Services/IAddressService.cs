using API.Dto;
using API.Entity;
using API.GraphQL.Address.AddressInputs;

namespace API.Interfaces.Services;

public interface IAddressService : IService<Address, AddressDto, CreateAddressInput, UpdateAddressInput>
{
    IQueryable<CustomerDto> GetAddressCustomer(int AddressId);
}

