using API.Dto;
using API.GraphQL.Customer.CustomerInputs;
using Entity;

namespace API.Interfaces.Services
{
    public interface ICustomerService : IService<Customer, CustomerDto, CreateCustomerInput, UpdateCustomerInput>
    {
    }
}
