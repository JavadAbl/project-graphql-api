using API.Dto;
using API.Interfaces.Services;

namespace API.GraphQL.Customer;

public class CustomerQueryResolvers
{
    [UseOffsetPaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<CustomerDto> GetCustomers([Service] ICustomerService customerService)
    {
        return customerService.GetMany();
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<CustomerDto?> GetCustomerById(int id, [Service] ICustomerService customerService)
    {
        return customerService.GetById(id);
    }

}