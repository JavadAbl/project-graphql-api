using API.Dto;

namespace API.GraphQL.User;

public class BranchType : ObjectType<UserDto>
{
    protected override void Configure(IObjectTypeDescriptor<UserDto> descriptor)
    {
        descriptor.Field(u => u.Branch)
                  .ResolveWith<BranchQueryResolvers>(r => r.GetBranch(default!, default!, default));
    }
}



