
using API.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace API.Repositories;

public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
{
    protected readonly DbContext _context;
    protected readonly DbSet<TEntity> _dbSet;

    public Repository(DbContext context)
    {
        _context = context;
        _dbSet = context.Set<TEntity>();
    }

    #region Read Operations

    public virtual async Task<IEnumerable<TEntity>> FindManyAsync(
        Expression<Func<TEntity, bool>>? filter = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
        string includeProperties = "",
        int? skip = null,
        int? take = null)
    {
        IQueryable<TEntity> query = _dbSet;

        if (filter != null)
        {
            query = query.Where(filter);
        }

        foreach (var includeProperty in includeProperties.Split
            (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
        {
            query = query.Include(includeProperty.Trim());
        }

        if (orderBy != null)
        {
            query = orderBy(query);
        }

        if (skip.HasValue)
        {
            query = query.Skip(skip.Value);
        }

        if (take.HasValue)
        {
            query = query.Take(take.Value);
        }

        return await query.AsNoTracking().ToListAsync();
    }

    public virtual async Task<TEntity?> FindOneByAsync(Expression<Func<TEntity, bool>> predicate, string includeProperties = "")
    {
        IQueryable<TEntity> query = _dbSet;

        foreach (var includeProperty in includeProperties.Split
            (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
        {
            query = query.Include(includeProperty.Trim());
        }

        return await query.AsNoTracking().FirstOrDefaultAsync(predicate);
    }

    public virtual async Task<TEntity?> GetByIdAsync(object id)
    {
        return await _dbSet.FindAsync(id);
    }

    public virtual async Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> predicate)
    {
        return await _dbSet.AnyAsync(predicate);
    }

    public virtual async Task<int> CountAsync(Expression<Func<TEntity, bool>>? filter = null)
    {
        if (filter == null)
            return await _dbSet.CountAsync();

        return await _dbSet.CountAsync(filter);
    }

    #endregion

    #region Create Operations

    public virtual async Task<TEntity> InsertAsync(TEntity entity)
    {
        var entry = await _dbSet.AddAsync(entity);
        return entry.Entity;
    }

    public virtual async Task InsertManyAsync(IEnumerable<TEntity> entities)
    {
        await _dbSet.AddRangeAsync(entities);
    }

    #endregion

    #region Update Operations


    public virtual async Task UpdateAsync(TEntity entityToUpdate)
    {
        _dbSet.Attach(entityToUpdate);
        _context.Entry(entityToUpdate).State = EntityState.Modified;
    }

    /// <summary>
    /// Applies non-null values from input DTO to the target entity.
    /// Property names must match between input and entity.
    /// </summary>
    public virtual void ApplyUpdate<TInput>(TEntity entity, TInput input)
        where TInput : class
    {
        var inputProps = typeof(TInput).GetProperties();
        var entityProps = typeof(TEntity).GetProperties();

        foreach (var prop in inputProps)
        {
            var value = prop.GetValue(input);
            if (value is not null)
            {
                var targetProp = entityProps.FirstOrDefault(p => p.Name == prop.Name);
                if (targetProp != null && targetProp.CanWrite)
                {
                    targetProp.SetValue(entity, value);
                }
            }
        }
    }
    public virtual async Task UpdateManyAsync(Expression<Func<TEntity, bool>> filter, Action<TEntity> updateAction)
    {
        var entities = await _dbSet.Where(filter).ToListAsync();
        foreach (var entity in entities)
        {
            updateAction(entity);
        }
    }

    #endregion

    #region Delete Operations

    public virtual void Delete(TEntity entity) => _dbSet.Remove(entity);

    public virtual async Task<int> DeleteManyAsync(Expression<Func<TEntity, bool>> filter)
    {
        var entities = await _dbSet.Where(filter).ToListAsync();
        _dbSet.RemoveRange(entities);
        return entities.Count;
    }

    #endregion

    #region Utility Methods

    public virtual IQueryable<TEntity> GetQueryable() => _dbSet.AsQueryable().AsNoTracking();

    public Task<bool> Exists(Expression<Func<TEntity, bool>> predicate) => _dbSet.AnyAsync(predicate);

    public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;

    #endregion
}