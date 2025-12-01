using API.Dto;
using API.Interfaces.Repositories;
using API.Interfaces.Services;
using Microsoft.EntityFrameworkCore;

namespace API.GraphQL.User;


[ExtendObjectType(typeof(Query))]
public class UserQueryResolvers
{
    [UseProjection]
    public IQueryable<UserDto> GetUsers([Service] IUserService userService)
    {
        return userService.GetMany();
    }

    [UseProjection]
    public Task<UserDto?> GetUserById(int id, [Service] IUserService userService, [Service] IUserRepository rep)
    {
        return userService.GetById(id).FirstOrDefaultAsync();

    }

    public IQueryable<UserDto> GetUsersByBranch(int branchId, [Service] IUserService userService)
    {
        return userService.GetUsersByBranch(branchId);
    }

    [UseProjection]
    public async Task<BranchDto?> GetUserBranch(
        [Parent] UserDto user,
        [Service] IUserService userService,
        CancellationToken ct)
    {
        Console.WriteLine(user.Username);
        return await userService.GetUserBranch(user.Id).FirstOrDefaultAsync();
    }

}