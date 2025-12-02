using API.Dto;

namespace API.GraphQL.User;

public class UserType : ObjectType<UserDto>
{
    protected override void Configure(IObjectTypeDescriptor<UserDto> descriptor)
    {
        // descriptor.Field(u => u.Id).IsProjected(true);

        descriptor.Field(u => u.Branch).ResolveWith<UserQueryResolvers>(r => r.GetUserBranch(default!, default!));
    }
}



