using API.GraphQL.Address;
using API.GraphQL.Branch;
using API.GraphQL.Customer;
using API.GraphQL.Factor;
using API.GraphQL.User;

namespace API.GraphQL;


public class Mutation()
{
    public UserMutationResolvers UsersMutation() => new UserMutationResolvers();
    public BranchMutationResolvers BranchesMutation() => new BranchMutationResolvers();
    public AddressMutationResolvers AddressesMutation() => new AddressMutationResolvers();
    public CustomerMutationResolvers CustomersMutation() => new CustomerMutationResolvers();
    public FactorMutationResolvers FactorsMutation() => new FactorMutationResolvers();

}

