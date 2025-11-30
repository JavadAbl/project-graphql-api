using API.Dto;
using API.GraphQL.Customer.CustomerInputs;
using API.Interfaces.Services;

namespace API.GraphQL.Customer;

[ExtendObjectType(typeof(Mutation))]
public class CustomerMutationResolvers
{
  public async Task<CustomerDto> CreateCustomer(
    CreateCustomerInput input,
    [Service] ICustomerService customerService) =>
    await customerService.Create(input);

  public async Task<CustomerDto?> UpdateCustomer(
       int id,
       UpdateCustomerInput input,
       [Service] ICustomerService customerService) =>
       await customerService.Update(id, input);


  public async Task<bool> DeleteCustomer(
      int id,
      [Service] ICustomerService customerService) =>
      await customerService.Delete(id);

}

