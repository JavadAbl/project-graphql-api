using API.Dto;

namespace API.GraphQL.User;

public class UserType : ObjectType<UserDto>
{
    protected override void Configure(IObjectTypeDescriptor<UserDto> descriptor)
    {
        /*  descriptor.Field(t => t.Id).Type<NonNullType<IdType>>();
         descriptor.Field(t => t.FirstName);
         descriptor.Field(t => t.LastName);
         descriptor.Field(t => t.Username);
         descriptor.Field(t => t.IsActive);
         descriptor.Field(t => t.Role);
         descriptor.Field(t => t.Branch); */


        descriptor.Field(u => u.Branch).ResolveWith<UserQueryResolvers>(r => r.GetUserBranch(default!, default!, default));
    }
}



