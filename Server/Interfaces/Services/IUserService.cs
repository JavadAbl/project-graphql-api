using API.Dto;
using API.GraphQL.User.UserInputs;

namespace API.Interfaces.Services;

public interface IUserService
{
    Task<IEnumerable<UserDto>> GetUsers();
    Task<UserDto?> GetById(int id);
    Task<BranchDto?> GetUserBranch(int userId);
    Task<UserDto> CreateUser(CreateUserInput input);
    Task<UserDto> UpdateUser(int id, UpdateUserInput input);
    Task<bool> DeleteUser(int id);
    Task<bool> SetBranch(int id, SetUserBranchInput input);

}

