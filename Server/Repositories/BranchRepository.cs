using API.Interfaces.Repositories;
using Database;
using Entity;

namespace API.Repositories
{
    public class BranchRepository : Repository<Branch>, IBranchRepository
    {
        private readonly AppDbContext _context;

        public BranchRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

    }
}
