using API.Dto;
using API.GraphQL.Branch.BranchInputs;
using API.Interfaces.Services;

namespace API.GraphQL.Branch;

public class BranchMutationResolvers
{
  public async Task<BranchDto> CreateBranch(
    CreateBranchInput input,
    [Service] IBranchService branchService) =>
    await branchService.Create(input);

  public async Task<BranchDto?> UpdateBranch(
       int id,
       UpdateBranchInput input,
       [Service] IBranchService branchService) =>
       await branchService.Update(id, input);


  public async Task<bool> DeleteBranch(
      int id,
      [Service] IBranchService branchService) =>
      await branchService.Delete(id);

}

