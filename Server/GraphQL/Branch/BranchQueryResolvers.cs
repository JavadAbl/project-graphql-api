using API.Dto;
using API.GraphQL.Branch.BranchInputs;
using API.Interfaces.Services;

namespace API.GraphQL.Branch;


[ExtendObjectType(typeof(Query))]
public class BranchQueryResolvers
{
    public Task<IEnumerable<BranchDto>> GetBranches([Service] IBranchService branchService)
    {
        return branchService.GetMany();
    }

    public async Task<BranchDto?> GetBranchById(int id, [Service] IBranchService branchService)
    {
        return await branchService.GetById(id);
    }

    public async Task<BranchDto> CreateBranch(CreateBranchInput input, [Service] IBranchService branchService)
    {
        return await branchService.Create(input);
    }

}