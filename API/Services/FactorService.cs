using API.Dto;
using API.Entity;
using API.GraphQL.Factor.FactorInputs;
using API.Interfaces.Repositories;
using API.Interfaces.Services;


namespace API.Services;

public class FactorService(IFactorRepository rep) : Service<Factor, FactorDto, CreateFactorInput, object>(rep), IFactorService
{
    public override IQueryable<FactorDto> GetMany()
    {
        return rep.GetQueryable().Select(ToProjectionExpression<Factor, FactorDto>());
    }

    public override IQueryable<FactorDto> GetById(int id)
    {
        IQueryable<Factor> baseQuery = rep.GetQueryable().Where(u => u.Id == id);
        return baseQuery.Select(ToProjectionExpression<Factor, FactorDto>());
    }

    public override async Task<FactorDto> Create(CreateFactorInput input)
    {
        throw new NotImplementedException("no need to implement");
    }

    public override async Task<FactorDto> Update(int id, object input)
    {
        throw new NotImplementedException("no need to implement");
    }

    public override async Task<bool> Delete(int id)
    {
        var factor = await CheckExistsByIdAsync(id);
        rep.Delete(factor);
        return await rep.SaveChangesAsync();
    }

}

