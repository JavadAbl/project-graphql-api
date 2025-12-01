using API.Dto;
using API.Entity;
using API.GraphQL.User.UserInputs;
using API.Interfaces.Repositories;
using API.Interfaces.Services;


namespace API.Services;

public class UserService(IUserRepository rep) : Service<User, UserDto, CreateUserInput, UpdateUserInput>(rep), IUserService
{
    public override IQueryable<UserDto> GetMany()
    {
        return rep.GetQueryable().Select(ToProjectionExpression<User, UserDto>());
    }

    public override IQueryable<UserDto> GetById(int id)
    {
        IQueryable<User> baseQuery = rep.GetQueryable().Where(u => u.Id == id);
        return baseQuery.Select(ToProjectionExpression<User, UserDto>());
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


    public IQueryable<BranchDto?> GetUserBranch(int userId)
    {
        return rep.GetQueryable()
            .Where(u => u.Id == userId)
            .Select(u => u.Branch != null ? new BranchDto
            {
                Id = u.Branch.Id,
                Name = u.Branch.Name,
                Location = u.Branch.Location
            } : null);
        /*  var userDtoQ = rep.GetQueryable().Where(u => u.Id == userId).Select(ToProjectionExpression<User, UserDto>());
          var branchDtoQ = userDtoQ.Select(e => e.Branch);
          return branchDtoQ;*/
    }

    public IQueryable<UserDto> GetUsersByBranch(int branchId)
    {
        return rep.GetQueryable().Where(u => u.BranchId == branchId).Select(ToProjectionExpression<User, UserDto>());

    }

    public async Task<bool> SetBranch(int id, SetUserBranchInput input)
    {
        var user = await CheckExistsByIdAsync(id);
        rep.ApplyUpdate<SetUserBranchInput>(user, input);
        return await rep.SaveChangesAsync();
    }

    private string HashPassword(string password)
    {
        return Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(password));
    }

}

