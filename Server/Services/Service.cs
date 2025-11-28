using API.Interfaces.Repositories;
using API.Interfaces.Services;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Runtime.Serialization;
using KeyNotFoundException = System.Collections.Generic.KeyNotFoundException;

namespace API.Services;

public class Service<TEntity, TDto>(IRepository<TEntity> rep) : IService<TEntity, TDto>
    where TEntity : class
    where TDto : class
{


    /// <summary>
    /// Retrieves the entity with the given <paramref name="id"/>, throws if it does not exist,
    /// maps it to <typeparamref name="TDto"/> and returns the DTO.
    /// </summary>
    public async Task<TEntity> CheckExistsByIdAsync(int id)
    {
        // fetch the entity
        var entity = await rep.GetByIdAsync(id);
        if (entity is null)
        {
            throw new KeyNotFoundException(
                $"{typeof(TEntity).Name} with id {id} not found");
        }

        return entity;
    }



    public async Task<bool> CheckConflictByIdAsync(int id)
    {
        var exists = await rep.Exists(e => EF.Property<int>(e, "Id") == id);
        if (exists)
            throw new KeyNotFoundException(
              $"{typeof(TEntity).Name} with id {id} not found");

        return exists;
    }

    // Simple generic mapper – works for flat objects with matching property names.
    /*  public static TDto MapToDto(TEntity entity)
      {
          var dto = new TDto();
          var entityProps = typeof(TEntity).GetProperties();
          var dtoProps = typeof(TDto).GetProperties();

          foreach (var eProp in entityProps)
          {
              var dProp = System.Array.Find(dtoProps,
                  p => p.Name == eProp.Name && p.PropertyType == eProp.PropertyType);
              if (dProp != null && dProp.CanWrite)
              {
                  var value = eProp.GetValue(entity);
                  dProp.SetValue(dto, value);
              }
          }

          return dto;
      }*/


    public static TDto MapToDto<TEntity, TDto>(TEntity entity)
       where TEntity : class
       where TDto : class
    {
        TDto dto = CreateInstance<TDto>();

        var entityProps = typeof(TEntity).GetProperties(BindingFlags.Public | BindingFlags.Instance);
        var dtoProps = typeof(TDto).GetProperties(BindingFlags.Public | BindingFlags.Instance);

        foreach (var eProp in entityProps)
        {
            var dProp = dtoProps.FirstOrDefault(p =>
                p.Name == eProp.Name &&
                p.PropertyType == eProp.PropertyType &&
                p.CanWrite);

            if (dProp == null) continue;

            var value = eProp.GetValue(entity);
            dProp.SetValue(dto, value);
        }

        return dto;
    }

    private static T CreateInstance<T>() where T : class
    {
        // Try the normal public parameter‑less ctor first
        var ctor = typeof(T).GetConstructor(Type.EmptyTypes);
        if (ctor != null)
            return (T)Activator.CreateInstance(typeof(T));

        // No public ctor → use uninitialized object (no ctor runs)
        return (T)FormatterServices.GetUninitializedObject(typeof(T));
    }


}
