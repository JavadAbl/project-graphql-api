using API.Dto;
using API.GraphQL.Customer.CustomerInputs;
using API.Interfaces.Services;
using AppAny.HotChocolate.FluentValidation;

namespace API.GraphQL.Customer;

public class CustomerMutationResolvers
{
  public async Task<CustomerDto> CreateCustomer(
    [UseFluentValidation] CreateCustomerInput input,
    [Service] ICustomerService customerService) =>
    await customerService.Create(input);

  public async Task<CustomerDto?> UpdateCustomer(
       int id,
       [UseFluentValidation] UpdateCustomerInput input,
       [Service] ICustomerService customerService) =>
       await customerService.Update(id, input);


  public async Task<bool> DeleteCustomer(
      int id,
      [Service] ICustomerService customerService) =>
      await customerService.Delete(id);

}

