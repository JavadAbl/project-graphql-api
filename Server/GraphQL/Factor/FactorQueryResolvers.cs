using API.Dto;

namespace API.GraphQL.Factor;


[ExtendObjectType(typeof(Query))]
public class FactorQueryResolvers
{
    public Task<IEnumerable<FactorDto>> GetFactores([Service] IFactorService factorService)
    {
        return factorService.GetMany();
    }

    public async Task<FactorDto?> GetFactorById(int id, [Service] IFactorService factorService)
    {
        return await factorService.GetById(id);
    }

}