using API.Entity;
using API.Interfaces.Repositories;
using Database;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class UserRepository(AppDbContext ctx) : Repository<User>(ctx), IUserRepository
    {
        public override Task<User?> GetByIdAsync(object id)
        {
            return ctx.Users.Include(e => e.Branch).FirstOrDefaultAsync(e => e.Id == (int)id);
        }
    }
}
