using API.Dto;
using API.Interfaces.Services;

namespace API.GraphQL.Factor;


public class FactorQueryResolvers
{
    [UseOffsetPaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<FactorDto> GetFactores([Service] IFactorService factorService)
    {
        return factorService.GetMany();
    }

    [UseFirstOrDefault]
    [UseProjection]
    public IQueryable<FactorDto?> GetFactorById(int id, [Service] IFactorService factorService)
    {
        return factorService.GetById(id);
    }

}