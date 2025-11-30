using API.Dto;
using API.GraphQL.Address.AddressInputs;
using Entity;

namespace API.Interfaces.Services;

public interface IAddressService : IService<Address, AddressDto, CreateAddressInput, UpdateAddressInput>
{
    Task<CustomerDto> GetCustomer(int AddressId);
}

