using API.Dto;
using API.GraphQL.Factor.FactorInputs;
using Entity;

namespace API.Interfaces.Services
{
    public interface IFactorService : IService<Factor, FactorDto, CreateFactorInput>
    {
    }
}
