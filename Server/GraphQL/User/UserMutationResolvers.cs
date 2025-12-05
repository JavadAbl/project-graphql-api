using API.Dto;
using API.GraphQL.User.UserInputs;
using API.Interfaces.Services;
using AppAny.HotChocolate.FluentValidation;

namespace API.GraphQL.User;

// [ExtendObjectType(typeof(Mutation))]
public class UserMutationResolvers
{
  public async Task<UserDto> CreateUser(
  [UseFluentValidation] CreateUserInput input,
    [Service] IUserService userService) =>
    await userService.Create(input);

  public async Task<UserDto?> UpdateUser(
       int id,
      [UseFluentValidation] UpdateUserInput input,
       [Service] IUserService userService) =>
       await userService.Update(id, input);


  public async Task<bool> DeleteUser(
      int id,
      [Service] IUserService userService) =>
      await userService.Delete(id);

  public async Task<bool> SetUserBranch(
     int id,
    [UseFluentValidation] SetUserBranchInput input,
    [Service] IUserService userService) =>
  await userService.SetBranch(id, input);
}

