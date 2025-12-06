using API.Dto;
using API.Entity;
using API.GraphQL.Customer.CustomerInputs;
using API.Interfaces.Repositories;
using API.Interfaces.Services;

namespace API.Services
{
    public class CustomerService(ICustomerRepository rep)
        : Service<Customer, CustomerDto, CreateCustomerInput, UpdateCustomerInput>(rep), ICustomerService
    {
        public override IQueryable<CustomerDto> GetMany()
        {
            return rep.GetQueryable().Select(ToProjectionExpression<Customer, CustomerDto>());
        }

        public override IQueryable<CustomerDto> GetById(int id)
        {
            IQueryable<Customer> baseQuery = rep.GetQueryable().Where(c => c.Id == id);
            return baseQuery.Select(ToProjectionExpression<Customer, CustomerDto>());
        }

        public override async Task<CustomerDto> Create(CreateCustomerInput input)
        {
            var existingCustomer = await rep.FindOneByAsync(e => e.Email == input.Email);

            if (existingCustomer != null)
                throw new InvalidOperationException($"'{input.Email}' already exists");

            // Create new customer entity
            var customer = new Customer
            {
                FirstName = input.FirstName.Trim(),
                LastName = input.LastName.Trim(),
                Email = input.Email,
                Phone = input.Phone,
            };

            // Save to database
            var createdCustomer = await rep.InsertAsync(customer);
            await rep.SaveChangesAsync();

            // Return DTO
            return MapToDto<Customer, CustomerDto>(createdCustomer);
        }

        public override async Task<CustomerDto> Update(int id, UpdateCustomerInput input)
        {
            var customer = await CheckExistsByIdAsync(id);
            rep.ApplyUpdate(customer, input);
            await rep.SaveChangesAsync();
            return MapToDto<Customer, CustomerDto>(customer);
        }

        public override async Task<bool> Delete(int id)
        {
            var customer = await CheckExistsByIdAsync(id);
            rep.Delete(customer);
            return await rep.SaveChangesAsync();
        }

    }
}
