namespace API.Interfaces.Repositories;

using System.Linq.Expressions;

public interface IRepository<TEntity> where TEntity : class
{
    // Read operations
    Task<IEnumerable<TEntity>> FindManyAsync(
        Expression<Func<TEntity, bool>>? filter = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
        string includeProperties = "",
        int? skip = null,
        int? take = null);

    Task<TEntity?> FindOneByAsync(Expression<Func<TEntity, bool>> predicate, string includeProperties = "");
    Task<TEntity?> GetByIdAsync(object id);
    Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> predicate);
    Task<int> CountAsync(Expression<Func<TEntity, bool>>? filter = null);

    // Create operations
    Task<TEntity> InsertAsync(TEntity entity);
    Task InsertManyAsync(IEnumerable<TEntity> entities);

    // Update operations
    Task UpdateAsync(TEntity entityToUpdate);
    void ApplyUpdate<TInput>(TEntity entity, TInput input) where TInput : class;
    Task UpdateManyAsync(Expression<Func<TEntity, bool>> filter, Action<TEntity> updateAction);

    // Delete operations
    void Delete(TEntity entity);
    Task<int> DeleteManyAsync(Expression<Func<TEntity, bool>> filter);

    // Utility
    IQueryable<TEntity> GetQueryable();

    Task<bool> Exists(Expression<Func<TEntity, bool>> predicate);

    Task<bool> SaveChangesAsync();



}