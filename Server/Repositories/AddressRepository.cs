using API.Entity;
using API.Interfaces.Repositories;
using Database;

namespace API.Repositories;

public class AddressRepository(AppDbContext rep) : Repository<Address>(rep), IAddressRepository
{
}