using API.Interfaces.Repositories;
using Database;
using Entity;

namespace API.Repositories;

public class AddressRepository(AppDbContext rep) : Repository<Address>(rep), IAddressRepository
{
}