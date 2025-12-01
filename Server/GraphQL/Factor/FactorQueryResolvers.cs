using API.Dto;
using API.Interfaces.Services;
using Microsoft.EntityFrameworkCore;

namespace API.GraphQL.Factor;


[ExtendObjectType(typeof(Query))]
public class FactorQueryResolvers
{
    [UseProjection]
    public Task<List<FactorDto>> GetFactores([Service] IFactorService factorService)
    {
        return factorService.GetMany().ToListAsync();
    }


    [UseProjection]
    public Task<FactorDto?> GetFactorById(int id, [Service] IFactorService factorService)
    {
        return factorService.GetById(id).FirstOrDefaultAsync();
    }

}