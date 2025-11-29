using API.Dto;
using API.Interfaces.Services;

namespace API.GraphQL.User;


[ExtendObjectType(typeof(Query))]
public class BranchQueryResolvers
{
    public Task<IEnumerable<UserDto>> GetUsers([Service] IUserService userService)
    {
        return userService.GetMany();
    }

    public async Task<UserDto?> GetUserById(int id, [Service] IUserService userService)
    {
        return await userService.GetById(id);
    }

    // Resolver for the `branch` field on UserDto
    public async Task<BranchDto?> GetBranch(
        [Parent] UserDto user,
        [Service] IUserService userService,
        CancellationToken ct)
    {
        return await userService.GetUserBranch(user.Id);
    }

}