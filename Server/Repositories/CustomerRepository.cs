using API.Interfaces.Repositories;
using Database;
using Entity;

namespace API.Repositories;

public class CustomerRepository(AppDbContext rep) : Repository<Customer>(rep), ICustomerRepository
{
}