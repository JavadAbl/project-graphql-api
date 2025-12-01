using API.Dto;
using API.Entity;
using API.GraphQL.User.UserInputs;

namespace API.Interfaces.Services;

public interface IUserService : IService<User, UserDto, CreateUserInput, UpdateUserInput>
{

    Task<bool> SetBranch(int id, SetUserBranchInput input);
    IQueryable<BranchDto> GetUserBranch(int userId);
    IQueryable<UserDto> GetUsersByBranch(int branchId);

}

