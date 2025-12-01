namespace API.Interfaces.Services;

public interface IService<TEntity, TDto, TCreateInput, TUpdateInput>
    where TEntity : class
    where TDto : class
    where TCreateInput : class
    where TUpdateInput : class
{
    public IQueryable<TDto> GetMany();
    public IQueryable<TDto> GetById(int id);
    public Task<TDto> Create(TCreateInput input);
    public Task<TDto> Update(int id, TUpdateInput input);
    public Task<bool> Delete(int id);
    public Task<TEntity> CheckExistsByIdAsync(int id);
    public Task<bool> CheckConflictByIdAsync(int id);

}

