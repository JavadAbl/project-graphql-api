using API.Dto;
using API.GraphQL.User.UserInputs;
using API.Interfaces.Services;

namespace API.GraphQL.User;


[ExtendObjectType(typeof(Query))]
public class UserQueryResolvers
{


    public Task<IEnumerable<UserDto>> GetUsers([Service] IUserService userService)
    {
        return userService.GetUsers();
    }

    public async Task<UserDto?> GetUserById(int id, [Service] IUserService userService)
    {
        return await userService.GetById(id);
    }

    public async Task<UserDto> CreateUser(CreateUserInput input, [Service] IUserService userService)
    {
        return await userService.CreateUser(input);
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