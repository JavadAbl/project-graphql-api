using API.Dto;
using API.GraphQL.User.UserInputs;
using API.Interfaces.Services;

namespace API.GraphQL.User;

[ExtendObjectType(typeof(Mutation))]
public class UserMutationResolvers
{
    public async Task<UserDto> CreateUser(
      CreateUserInput input,
      [Service] IUserService userService) =>
      await userService.CreateUser(input);

    public async Task<UserDto?> UpdateUser(
         int id,
         UpdateUserInput input,
         [Service] IUserService userService) =>
         await userService.UpdateUser(id, input);


    public async Task<bool> DeleteUser(
        int id,
        [Service] IUserService userService) =>
        await userService.DeleteUser(id);

    public async Task<bool> SetUserBranch(
       int id,
       SetUserBranchInput input,
      [Service] IUserService userService) =>
    await userService.SetBranch(id, input);
}

