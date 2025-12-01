using API.Dto;
using API.GraphQL.Customer.CustomerInputs;
using API.Interfaces.Services;
using Microsoft.EntityFrameworkCore;

namespace API.GraphQL.Customer;


[ExtendObjectType(typeof(Query))]
public class CustomerQueryResolvers
{
    [UseProjection]
    public Task<List<CustomerDto>> GetCustomers([Service] ICustomerService customerService)
    {
        return customerService.GetMany().ToListAsync();
    }


    [UseProjection]
    public Task<CustomerDto?> GetCustomerById(int id, [Service] ICustomerService customerService)
    {
        return customerService.GetById(id).FirstOrDefaultAsync();
    }

    public async Task<CustomerDto> CreateCustomer(CreateCustomerInput input, [Service] ICustomerService customerService)
    {
        return await customerService.Create(input);
    }

}