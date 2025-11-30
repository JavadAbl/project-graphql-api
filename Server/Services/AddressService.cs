using API.Dto;
using API.GraphQL.Address.AddressInputs;
using API.Interfaces.Repositories;
using API.Interfaces.Services;
using Entity;

namespace API.Services
{
    public class AddressService(IAddressRepository rep, ICustomerService customerService)
        : Service<Address, AddressDto, CreateAddressInput, UpdateAddressInput>(rep), IAddressService
    {
        public override async Task<IEnumerable<AddressDto>> GetMany() => rep.GetQueryable().Select(u => MapToDto<Address, AddressDto>(u));


        public override async Task<AddressDto?> GetById(int id)
        {
            var address = await CheckExistsByIdAsync(id);
            var addressDto = MapToDto<Address, AddressDto>(address);
            return addressDto;
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

        public async Task<CustomerDto> GetCustomer(int AddressId)
        {
            var address = await rep.GetByIdAsync(AddressId);
            var customer = address!.Customer;
            return CustomerService.MapToDto<Customer, CustomerDto>(customer);
        }
    }
}
