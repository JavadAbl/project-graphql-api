using API.Dto;
using API.Entity;
using API.GraphQL.Address.AddressInputs;
using API.Interfaces.Repositories;
using API.Interfaces.Services;


namespace API.Services;

public class AddressService(IAddressRepository rep, ICustomerService customerService)
    : Service<Address, AddressDto, CreateAddressInput, UpdateAddressInput>(rep), IAddressService
{
    public override IQueryable<AddressDto> GetMany()
    {
        return rep.GetQueryable().Select(ToProjectionExpression<Address, AddressDto>());
    }

    public override IQueryable<AddressDto> GetById(int id)
    {
        IQueryable<Address> baseQuery = rep.GetQueryable().Where(a => a.Id == id);
        return baseQuery.Select(ToProjectionExpression<Address, AddressDto>());
    }

    public override async Task<AddressDto> Create(CreateAddressInput input)
    {
        var customer = await customerService.CheckExistsByIdAsync(input.CustomerId);

        // Create new address entity
        var address = new Address
        {
            AddressLine1 = input.AddressLine1.Trim(),
            AddressLine2 = input.AddressLine2?.Trim(),
            AddressType = input.AddressType,
            City = input.City,
            Country = input.Country,
            PostalCode = input.PostalCode,
            State = input.State,
            Customer = customer,
        };


        // Save to database
        var createdAddress = await rep.InsertAsync(address);
        await rep.SaveChangesAsync();

        // Return DTO
        return MapToDto<Address, AddressDto>(createdAddress);
    }

    public override async Task<AddressDto> Update(int id, UpdateAddressInput input)
    {
        var address = await CheckExistsByIdAsync(id);
        rep.ApplyUpdate(address, input);
        await rep.SaveChangesAsync();
        return MapToDto<Address, AddressDto>(address);
    }

    public override async Task<bool> Delete(int id)
    {
        var address = await CheckExistsByIdAsync(id);
        rep.Delete(address);
        return await rep.SaveChangesAsync();
    }

    public IQueryable<CustomerDto> GetAddressCustomer(int AddressId)
    {
        var customerQ = rep.GetQueryable().Where(a => a.Id == AddressId).Select(a => a.Customer);
        var customerDtoQ = customerQ.Select(ToProjectionExpression<Customer, CustomerDto>());
        return customerDtoQ;
    }
}

