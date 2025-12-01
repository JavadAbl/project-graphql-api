using API.Dto;
using API.Entity;
using API.GraphQL.Factor.FactorInputs;

namespace API.Interfaces.Services
{
    public interface IFactorService : IService<Factor, FactorDto, CreateFactorInput, object?>
    {
    }
}
