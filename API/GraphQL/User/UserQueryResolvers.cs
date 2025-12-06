using API.Dto;
using API.Interfaces.Repositories;
using API.Interfaces.Services;

namespace API.GraphQL.User;

//[ExtendObjectType(typeof(Query))]
public class UserQueryResolvers
{

    [UseOffsetPaging()]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<UserDto> GetUsers([Service] IUserService userService)
    {
        return userService.GetMany();
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<UserDto?> GetUserById(int id, [Service] IUserService userService, [Service] IUserRepository rep)
    {
        return userService.GetById(id);
    }

    [UseProjection]
    public IQueryable<UserDto> GetUsersByBranch(int branchId, [Service] IUserService userService)
    {
        return userService.GetUsersByBranch(branchId);
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<BranchDto?> GetUserBranch(
           [Parent] UserDto user,
           [Service] IUserService userService
         )
    {
        return userService.GetUserBranch(user.Id);
    }

}