using API.Dto;

namespace API.GraphQL.Customer;

public class CustomerType : ObjectType<CustomerDto>
{
    protected override void Configure(IObjectTypeDescriptor<CustomerDto> descriptor)
    {
        /* descriptor.Field(u => u.Customer)
                   .ResolveWith<CustomerQueryResolvers>(r => r.GetCustomer(default!, default!, default));*/
    }
}



