using API.Dto;
using API.Interfaces.Services;

namespace API.GraphQL.User;


[ExtendObjectType(typeof(Query))]
public class UserQueryResolvers
{
    public Task<IEnumerable<UserDto>> GetUsers([Service] IUserService userService)
    {
        return userService.GetMany();
    }

    public async Task<UserDto?> GetUserById(int id, [Service] IUserService userService)
    {
        return await userService.GetById(id);
    }

    public async Task<IEnumerable<UserDto>> GetUsersByBranch(int branchId, [Service] IUserService userService)
    {
        return await userService.GetUsersByBranch(branchId);
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