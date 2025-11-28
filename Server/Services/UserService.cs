using API.Dto;
using API.GraphQL.User.UserInputs;
using API.Interfaces.Repositories;
using API.Interfaces.Services;
using Entity;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class UserService(IUserRepository rep) : Service<User, UserDto>(rep), IUserService
{

    public async Task<BranchDto?> GetUserBranch(int userId)
    {
        var user = await rep.GetByIdAsync(userId);

        if (user == null)
            return null;


        var branch = user.Branch;
        if (branch == null)
            return null;

        return new BranchDto
        {
            Id = branch.Id,
            Name = branch.Name,
            Phone = branch.Phone,
            Location = branch.Location
        };
    }

    public async Task<UserDto?> GetById(int id)
    {
        var user = await rep.GetQueryable()
            .FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
            return null;

        var userDto = MapToDto<User, UserDto>(user);
        /* var branch = user.Branch;
         if (branch != null)
             userDto.Branch = new BranchDto(branch.Id, branch.Name, branch.Phone, branch.Location);*/

        return userDto;
    }

    public async Task<IEnumerable<UserDto>> GetUsers()
    {
        return rep.GetQueryable()
            .Select(u => MapToDto<User, UserDto>(u));
    }

    public async Task<UserDto> CreateUser(CreateUserInput input)
    {
        var existingUser = await rep.FindOneByAsync(e => (e.Username == input.Username));

        if (existingUser != null)
            throw new InvalidOperationException($"Username '{input.Username}' already exists");

        // Create new user entity
        var user = new User
        {
            FirstName = input.FirstName.Trim(),
            LastName = input.LastName.Trim(),
            Username = input.Username.Trim(),
            Role = input.Role,
            PasswordHash = HashPassword(input.Password), // You'll need to implement password hashing
        };

        // If branch ID is provided, associate the user with the branch
        if (input.BranchId.HasValue)
        {
            user.BranchId = input.BranchId.Value;
        }

        // Save to database
        var createdUser = await rep.InsertAsync(user);
        await rep.SaveChangesAsync();

        // Return DTO
        return MapToDto<User, UserDto>(createdUser);
    }

    private string HashPassword(string password)
    {
        // Implement your preferred password hashing algorithm
        // Example using BCrypt (you'll need to install the BCrypt.Net-Next package):
        // return BCrypt.Net.BCrypt.HashPassword(password);

        // For now, returning a placeholder - implement proper hashing in production
        return Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(password));
    }

    public async Task<UserDto> UpdateUser(int id, UpdateUserInput input)
    {
        var user = await CheckExistsByIdAsync(id);
        rep.ApplyUpdate<UpdateUserInput>(user, input);
        await rep.SaveChangesAsync();
        return MapToDto<User, UserDto>(user);
    }

    public async Task<bool> DeleteUser(int id)
    {
        var user = await CheckExistsByIdAsync(id);
        rep.Delete(user);
        return await rep.SaveChangesAsync();
    }

    public async Task<bool> SetBranch(int id, SetUserBranchInput input)
    {
        var user = await CheckExistsByIdAsync(id);
        rep.ApplyUpdate<SetUserBranchInput>(user, input);
        return await rep.SaveChangesAsync();
    }
}

