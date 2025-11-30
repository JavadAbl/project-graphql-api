using Database;
using Entity;

namespace API.Repositories;

public class FactorRepository(AppDbContext rep) : Repository<Factor>(rep), IFactorRepository
{
}