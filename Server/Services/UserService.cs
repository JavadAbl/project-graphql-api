using System.Linq.Expressions;
using API.Dto;
using API.Entity;
using API.GraphQL.User.UserInputs;
using API.Interfaces.Repositories;
using API.Interfaces.Services;


namespace API.Services;

public class UserService(IUserRepository rep) : Service<User, UserDto, CreateUserInput, UpdateUserInput>(rep), IUserService
{
    public override async Task<IEnumerable<UserDto>> GetMany()
    {
        return rep.GetQueryable().Select(ToProjectionExpression<User, UserDto>());
    }

    public override async Task<IQueryable<UserDto>> GetById(int id)
    {
        IQueryable<User> baseQuery = rep.GetQueryable().Where(u => u.Id == id);
        return baseQuery.Select(ToProjectionExpression<User, UserDto>());
        /*  var user = await CheckExistsByIdAsync(id);
         var userDto = MapToDto<User, UserDto>(user);

         return userDto; */
    }

    public override async Task<UserDto> Create(CreateUserInput input)
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

    public override async Task<UserDto> Update(int id, UpdateUserInput input)
    {
        var user = await CheckExistsByIdAsync(id);
        rep.ApplyUpdate<UpdateUserInput>(user, input);
        await rep.SaveChangesAsync();
        return MapToDto<User, UserDto>(user);
    }

    public override async Task<bool> Delete(int id)
    {
        var user = await CheckExistsByIdAsync(id);
        rep.Delete(user);
        return await rep.SaveChangesAsync();
    }


    public IEnumerable<Branch?> GetUserBranch(int userId)
    {
        return rep.GetQueryable().Select(u => u.Branch);
    }

    private string HashPassword(string password)
    {
        return Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(password));
    }

    public async Task<bool> SetBranch(int id, SetUserBranchInput input)
    {
        var user = await CheckExistsByIdAsync(id);
        rep.ApplyUpdate<SetUserBranchInput>(user, input);
        return await rep.SaveChangesAsync();
    }

    public async Task<IEnumerable<UserDto>> GetUsersByBranch(int branchId)
    {
        var users = await rep.FindManyAsync(e => e.BranchId == branchId);
        return users.Select(e => MapToDto<User, UserDto>(e));
    }

}

