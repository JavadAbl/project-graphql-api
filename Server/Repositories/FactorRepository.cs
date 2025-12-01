using API.Entity;
using API.Interfaces.Repositories;
using Database;

namespace API.Repositories;

public class FactorRepository(AppDbContext rep) : Repository<Factor>(rep), IFactorRepository
{
}