using API.Dto;
using API.Entity;
using API.GraphQL.Branch.BranchInputs;
using API.Interfaces.Repositories;
using API.Interfaces.Services;

namespace API.Services
{
    public class BranchService(IBranchRepository rep)
        : Service<Branch, BranchDto, CreateBranchInput, UpdateBranchInput>(rep), IBranchService
    {
        public override async Task<IEnumerable<BranchDto>> GetMany()
        {
            return rep.GetQueryable()
                .Select(u => MapToDto<Branch, BranchDto>(u));
        }

        public override async Task<BranchDto?> GetById(int id)
        {
            var branch = await CheckExistsByIdAsync(id);
            var branchDto = MapToDto<Branch, BranchDto>(branch);

            return branchDto;
        }

        public override async Task<BranchDto> Create(CreateBranchInput input)
        {
            var existingBranch = await rep.FindOneByAsync(e => (e.Name == input.Name));

            if (existingBranch != null)
                throw new InvalidOperationException($"Branch '{input.Name}' already exists");

            // Create new branch entity
            var branch = new Branch
            {
                Name = input.Name.Trim(),
                Phone = input.Phone.Trim(),
                Location = input.Location.Trim()
            };


            // Save to database
            var createdBranch = await rep.InsertAsync(branch);
            await rep.SaveChangesAsync();

            // Return DTO
            return MapToDto<Branch, BranchDto>(createdBranch);
        }

        public override async Task<BranchDto> Update(int id, UpdateBranchInput input)
        {
            var branch = await CheckExistsByIdAsync(id);
            rep.ApplyUpdate<UpdateBranchInput>(branch, input);
            await rep.SaveChangesAsync();
            return MapToDto<Branch, BranchDto>(branch);
        }

        public override async Task<bool> Delete(int id)
        {
            var branch = await CheckExistsByIdAsync(id);
            rep.Delete(branch);
            return await rep.SaveChangesAsync();
        }


    }
}
