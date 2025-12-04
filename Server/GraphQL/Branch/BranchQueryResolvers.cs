using API.Dto;
using API.GraphQL.Branch.BranchInputs;
using API.Interfaces.Services;
using Microsoft.EntityFrameworkCore;

namespace API.GraphQL.Branch;


public class BranchQueryResolvers
{
    [UseOffsetPaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<BranchDto> GetBranches([Service] IBranchService branchService)
    {
        return branchService.GetMany();
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<BranchDto?> GetBranchById(int id, [Service] IBranchService branchService)
    {
        return branchService.GetById(id);
    }

    public async Task<BranchDto> CreateBranch(CreateBranchInput input, [Service] IBranchService branchService)
    {
        return await branchService.Create(input);
    }

}