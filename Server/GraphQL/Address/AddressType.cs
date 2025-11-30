using API.Dto;

namespace API.GraphQL.Address;

public class FactorType : ObjectType<AddressDto>
{
    protected override void Configure(IObjectTypeDescriptor<AddressDto> descriptor)
    {
        descriptor.Field(e => e.Customer).ResolveWith<FactorQueryResolvers>(e => e.GetCustomer(default!, default!));
    }
}



