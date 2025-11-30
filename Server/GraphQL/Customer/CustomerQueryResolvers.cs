using API.Dto;
using API.GraphQL.Customer.CustomerInputs;
using API.Interfaces.Services;

namespace API.GraphQL.Customer;


[ExtendObjectType(typeof(Query))]
public class CustomerQueryResolvers
{
    public Task<IEnumerable<CustomerDto>> GetCustomers([Service] ICustomerService customerService)
    {
        return customerService.GetMany();
    }

    public async Task<CustomerDto?> GetCustomerById(int id, [Service] ICustomerService customerService)
    {
        return await customerService.GetById(id);
    }

    public async Task<CustomerDto> CreateCustomer(CreateCustomerInput input, [Service] ICustomerService customerService)
    {
        return await customerService.Create(input);
    }

}