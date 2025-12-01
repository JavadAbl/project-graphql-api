using API.Entity;
using API.Interfaces.Repositories;
using Database;

namespace API.Repositories;

public class BranchRepository(AppDbContext rep) : Repository<Branch>(rep), IBranchRepository
{
}