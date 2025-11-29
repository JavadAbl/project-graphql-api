using API.Dto;
using API.GraphQL.User.UserInputs;
using Entity;

namespace API.Interfaces.Services;

public interface IUserService : IService<User, UserDto, CreateUserInput, UpdateUserInput>
{

    Task<bool> SetBranch(int id, SetUserBranchInput input);
    Task<BranchDto?> GetUserBranch(int userId);

}

