using API.Dto;
using API.Entity;
using API.GraphQL.User.UserInputs;

namespace API.Interfaces.Services;

public interface IUserService : IService<User, UserDto, CreateUserInput, UpdateUserInput>
{

    Task<bool> SetBranch(int id, SetUserBranchInput input);
    IEnumerable<Branch?> GetUserBranch(int userId);
    Task<IEnumerable<UserDto>> GetUsersByBranch(int branchId);

}

