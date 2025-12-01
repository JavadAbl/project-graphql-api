

using API.Dto;
using API.Interfaces.Repositories;
using API.Interfaces.Services;
using API.Services;
using UserClass = API.Entity.User;
using BranchClass = API.Entity.Branch;
using Microsoft.EntityFrameworkCore;

namespace API.GraphQL.User;


[ExtendObjectType(typeof(Query))]

public class UserQueryResolvers
{
    [UseProjection]
    public Task<IEnumerable<UserDto>> GetUsers([Service] IUserService userService)
    {
        return userService.GetMany();
    }

    [UseProjection]
    public async Task<UserDto?> GetUserById(int id, [Service] IUserService userService, [Service] IUserRepository rep)
    {

        IQueryable<UserDto> userQuery = await userService.GetById(id);
        return await userQuery.FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<UserDto>> GetUsersByBranch(int branchId, [Service] IUserService userService)
    {
        return await userService.GetUsersByBranch(branchId);
    }

    [UseProjection]
    public IEnumerable<BranchClass?> GetBranch(
        [Parent] UserDto user,
        [Service] IUserService userService,
        CancellationToken ct)
    {
        return userService.GetUserBranch(user.Id);
    }

}