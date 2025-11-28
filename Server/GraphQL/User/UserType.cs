using API.Dto;

namespace API.GraphQL.User;

public class UserType : ObjectType<UserDto>
{
    protected override void Configure(IObjectTypeDescriptor<UserDto> descriptor)
    {
        descriptor.Field(u => u.Branch)
                  .ResolveWith<UserQueryResolvers>(r => r.GetBranch(default!, default!, default));
    }
}



