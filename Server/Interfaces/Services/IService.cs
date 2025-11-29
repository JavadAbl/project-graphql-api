namespace API.Interfaces.Services;

public interface IService<TEntity, TDto, TCreateInput, TUpdateInput>
    where TEntity : class
    where TDto : class
    where TCreateInput : class
    where TUpdateInput : class
{
    public Task<IEnumerable<TDto>> GetMany();
    public Task<TDto?> GetById(int id);
    public Task<TDto> Create(TCreateInput input);
    public Task<TDto> Update(int id, TUpdateInput input);
    public Task<bool> Delete(int id);
}

