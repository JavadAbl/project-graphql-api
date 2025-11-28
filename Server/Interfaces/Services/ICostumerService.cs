using API.Dto;

namespace API.Interfaces.Services;

public interface ICustomerService
{
    IQueryable<CustomerDto> GetCustomers();
}

