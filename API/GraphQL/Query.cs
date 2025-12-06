using API.GraphQL.Address;
using API.GraphQL.Branch;
using API.GraphQL.Customer;
using API.GraphQL.Factor;
using API.GraphQL.User;

namespace API.GraphQL;


public class Query()
{
    public UserQueryResolvers UsersQuery() => new UserQueryResolvers();
    public BranchQueryResolvers BranchesQuery() => new BranchQueryResolvers();
    public AddressQueryResolvers AddressesQuery() => new AddressQueryResolvers();
    public CustomerQueryResolvers CustomersQuery() => new CustomerQueryResolvers();
    public FactorQueryResolvers FactorsQuery() => new FactorQueryResolvers();
}

