using API.Dto;
using API.Entity;
using API.GraphQL.Branch.BranchInputs;


namespace API.Interfaces.Services
{
    public interface IBranchService : IService<Branch, BranchDto, CreateBranchInput, UpdateBranchInput>
    {
    }
}
