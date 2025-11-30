using API.Dto;

namespace API.GraphQL.Address;

public class AddressType : ObjectType<AddressDto>
{
    protected override void Configure(IObjectTypeDescriptor<AddressDto> descriptor)
    {
        descriptor.Field(e => e.Customer).ResolveWith<AddressQueryResolvers>(e => e.)
    }
}



