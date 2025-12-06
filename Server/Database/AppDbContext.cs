using API.Entity;
using API.Enums;
using Database.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Database;

public class AppDbContext(DbContextOptions op) : DbContext(op)
{

    public DbSet<Customer> Customers { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Branch> Branches { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Address> Addresses { get; set; }
    public DbSet<Factor> Factors { get; set; }
    public DbSet<FactorOrder> FactorOrders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new CustomerConfiguration());
        modelBuilder.ApplyConfiguration(new ProductConfiguration());
        modelBuilder.ApplyConfiguration(new BranchConfiguration());
        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new AddressConfiguration());
        modelBuilder.ApplyConfiguration(new FactorConfiguration());
        modelBuilder.ApplyConfiguration(new FactorOrderConfiguration());


        modelBuilder.Entity<User>().HasData(
             new User
             {
                 Id = 1, // Id must be explicitly provided for HasData
                 FirstName = "Admin",
                 LastName = "User",
                 Username = "admin@example.com",
                 // IMPORTANT: In a real app, generate a proper password hash.
                 // This is just a placeholder.
                 PasswordHash = "some_secure_hash_for_password123",
                 Role = UserRoles.Admin,
                 BranchId = 1
             },
             new User
             {
                 Id = 2,
                 FirstName = "Regular",
                 LastName = "User",
                 Username = "user@example.com",
                 PasswordHash = "some_secure_hash_for_password456",
                 Role = UserRoles.Operator,
                 BranchId = 2
             }
         );

        modelBuilder.Entity<Branch>().HasData(
           new Branch
           {
               Id = 1,
               Name = "branch1",
               Location = "location1",
               Phone = "123"
           },
            new Branch
            {
                Id = 2,
                Name = "branch2",
                Location = "location2",
                Phone = "123"
            }
       );

        modelBuilder.Entity<Address>().HasData(
        new Address
        {
            Id = 1,
            AddressLine1 = "branch1",
            City = "location1",
            Country = "asd",
            PostalCode = "123",
            CustomerId = 1,
        }
      );



    }
}




