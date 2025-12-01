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
        public override IQueryable<BranchDto> GetMany()
        {
            return rep.GetQueryable().Select(ToProjectionExpression<Branch, BranchDto>());
        }

        public override IQueryable<BranchDto> GetById(int id)
        {
            IQueryable<Branch> baseQuery = rep.GetQueryable().Where(a => a.Id == id);
            return baseQuery.Select(ToProjectionExpression<Branch, BranchDto>());
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
