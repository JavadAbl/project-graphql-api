using API.Dto;
using API.Entity;
using API.GraphQL.Customer.CustomerInputs;

namespace API.Interfaces.Services
{
    public interface ICustomerService : IService<Customer, CustomerDto, CreateCustomerInput, UpdateCustomerInput>
    {
    }
}
