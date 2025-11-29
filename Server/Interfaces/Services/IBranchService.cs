using API.Dto;
using API.GraphQL.Branch.BranchInputs;
using Entity;

namespace API.Interfaces.Services
{
    public interface IBranchService : IService<Branch, BranchDto, CreateBranchInput, UpdateBranchInput>
    {
    }
}
