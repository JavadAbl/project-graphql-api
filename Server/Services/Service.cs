using API.Interfaces.Repositories;
using API.Interfaces.Services;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Reflection;
using System.Runtime.Serialization;
using KeyNotFoundException = System.Collections.Generic.KeyNotFoundException;

namespace API.Services;

public abstract class Service<TEntity, TDto, TCreateInput, TUpdateInput>(IRepository<TEntity> rep)
    : IService<TEntity, TDto, TCreateInput, TUpdateInput>
    where TEntity : class
    where TDto : class
    where TCreateInput : class
    where TUpdateInput : class
{
    public abstract IQueryable<TDto> GetMany();
    public abstract IQueryable<TDto> GetById(int id);
    public abstract Task<TDto> Create(TCreateInput input);
    public abstract Task<TDto> Update(int id, TUpdateInput input);
    public abstract Task<bool> Delete(int id);

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

    private static T CreateInstance<T>() where T : class
    {
        // Try the normal public parameter‑less ctor first
        var ctor = typeof(T).GetConstructor(Type.EmptyTypes);
        if (ctor != null)
            return (T)Activator.CreateInstance(typeof(T));

        // No public ctor → use uninitialized object (no ctor runs)
        return (T)FormatterServices.GetUninitializedObject(typeof(T));
    }



    /// <summary>
    /// Builds an Expression tree for a projection from TEntity to TDto.
    /// This allows for dynamic, reusable mapping that can be translated by EF Core.
    /// </summary>
    public static Expression<Func<TEntity, TDto>> ToProjectionExpression<TEntity, TDto>()
        where TEntity : class
        where TDto : class
    {
        // 1. Create the parameter for the input entity (e.g., "user")
        ParameterExpression entityParameter = Expression.Parameter(typeof(TEntity), "e");

        // 2. Get properties from both the source (Entity) and target (DTO)
        var entityProperties = typeof(TEntity).GetProperties(BindingFlags.Public | BindingFlags.Instance);
        var dtoProperties = typeof(TDto).GetProperties(BindingFlags.Public | BindingFlags.Instance)
                                         .Where(p => p.CanWrite); // We can only set properties that have a setter

        // 3. Create a list of member bindings (e.g., "Id = e.Id", "FirstName = e.FirstName")
        List<MemberBinding> memberBindings = new List<MemberBinding>();

        foreach (var dtoProp in dtoProperties)
        {
            // Find a matching property in the entity by name and type
            var entityProp = entityProperties.FirstOrDefault(p =>
                p.Name == dtoProp.Name &&
                p.PropertyType == dtoProp.PropertyType &&
                p.CanRead); // We can only read from properties that have a getter

            if (entityProp != null)
            {
                // Create an expression to access the property on the entity (e.g., "e.Id")
                MemberExpression propertyAccess = Expression.Property(entityParameter, entityProp);

                // Create a binding that assigns the entity property value to the DTO property
                MemberBinding binding = Expression.Bind(dtoProp, propertyAccess);
                memberBindings.Add(binding);
            }
        }

        // 4. Create the "new TDto(...)" part of the expression
        NewExpression newExpression = Expression.New(typeof(TDto));

        // 5. Combine the "new TDto(...)" with the member bindings to create "new TDto { ... }"
        MemberInitExpression memberInitExpression = Expression.MemberInit(newExpression, memberBindings);

        // 6. Create the final lambda expression: "e => new TDto { ... }"
        Expression<Func<TEntity, TDto>> lambda = Expression.Lambda<Func<TEntity, TDto>>(memberInitExpression, entityParameter);

        return lambda;
    }



    public static Expression<Func<TEntity?, TDto>> ToNullableProjectionExpression<TEntity, TDto>()
    where TEntity : class
    where TDto : class, new() // Constraint needed if you plan to use 'new TDto()'
    {
        // 1. Create the parameter for the input entity (now TEntity?)
        ParameterExpression entityParameter = Expression.Parameter(typeof(TEntity), "e");

        // --- The Core Projection Logic ---

        // 2. Get properties from both the source (Entity) and target (DTO)
        var entityProperties = typeof(TEntity).GetProperties(BindingFlags.Public | BindingFlags.Instance);
        var dtoProperties = typeof(TDto).GetProperties(BindingFlags.Public | BindingFlags.Instance)
                                        .Where(p => p.CanWrite);

        // 3. Create a list of member bindings
        List<MemberBinding> memberBindings = new List<MemberBinding>();

        foreach (var dtoProp in dtoProperties)
        {
            var entityProp = entityProperties.FirstOrDefault(p =>
                p.Name == dtoProp.Name &&
                p.PropertyType == dtoProp.PropertyType &&
                p.CanRead);

            if (entityProp != null)
            {
                MemberExpression propertyAccess = Expression.Property(entityParameter, entityProp);
                MemberBinding binding = Expression.Bind(dtoProp, propertyAccess);
                memberBindings.Add(binding);
            }
        }

        // 4. Create the "new TDto { ... }" part of the expression for the non-null case
        NewExpression newExpression = Expression.New(typeof(TDto));
        MemberInitExpression memberInitExpression = Expression.MemberInit(newExpression, memberBindings);

        // --- Null Handling Logic ---

        // Define the result for the null case (new TDto() or null)
        // NOTE: For projection, it's safer to return a default DTO if TDto is non-nullable.
        // If DTO is defined as 'class', you must ensure it has a public parameterless constructor.
        ConstantExpression nullResult = Expression.Constant(new TDto(), typeof(TDto)); // Assuming TDto has a default constructor

        // Define the condition: "e == null"
        Expression nullCheck = Expression.Equal(entityParameter, Expression.Constant(null, typeof(TEntity)));

        // Create the conditional expression: "e == null ? new TDto() : new TDto { ... }"
        ConditionalExpression conditionalExpression = Expression.Condition(
            test: nullCheck,
            ifTrue: nullResult,
            ifFalse: memberInitExpression
        );

        // 5. Create the final lambda expression: "e => (e == null ? new TDto() : new TDto { ... })"
        Expression<Func<TEntity?, TDto>> lambda = Expression.Lambda<Func<TEntity?, TDto>>(conditionalExpression, entityParameter);

        return lambda;
    }

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

}
