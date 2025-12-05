using API.Dto;
using API.GraphQL.Branch.BranchInputs;
using API.Interfaces.Services;
using AppAny.HotChocolate.FluentValidation;

namespace API.GraphQL.Branch;

public class BranchMutationResolvers
{
  public async Task<BranchDto> CreateBranch(
  [UseFluentValidation] CreateBranchInput input,
    [Service] IBranchService branchService)
  {
    return await branchService.Create(input);
  }

  public async Task<BranchDto?> UpdateBranch(
       int id,
     [UseFluentValidation] UpdateBranchInput input,
       [Service] IBranchService branchService)
  {
    return await branchService.Update(id, input);
  }


  public async Task<bool> DeleteBranch(
      int id,
      [Service] IBranchService branchService)
  { return await branchService.Delete(id); }

}

