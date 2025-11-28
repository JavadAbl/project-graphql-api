namespace API.Interfaces.Services;

public interface IService<TEntity, TDto>
    where TEntity : class
    where TDto : class
{
    /// <summary>
    /// Retrieves the entity with the given <paramref name="id"/>, throws if it does not exist,
    /// maps it to <typeparamref name="TDto"/> and returns the DTO.
    /// </summary>
    Task<TEntity> CheckExistsByIdAsync(int id);
    Task<bool> CheckConflictByIdAsync(int id);
}