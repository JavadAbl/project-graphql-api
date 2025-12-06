using API.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations;

public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
{
    public void Configure(EntityTypeBuilder<Customer> builder)
    {
        builder.ToTable("Customers");
        builder.HasIndex(e => e.Email).IsUnique();

        builder.HasKey(c => c.Id);
        builder.Property(c => c.Id)
            .ValueGeneratedOnAdd();

        builder.Property(c => c.FirstName)
            .HasMaxLength(50);

        builder.Property(c => c.LastName)
            .HasMaxLength(50);

        builder.Property(c => c.Email)
            .HasMaxLength(100);

        builder.Property(c => c.Phone)
            .HasMaxLength(20);

        // Navigation properties configuration
        builder.HasMany(c => c.Addresses)
            .WithOne(e => e.Customer)
            .HasForeignKey(e => e.CustomerId);

        builder.HasMany(c => c.Factors)
            .WithOne(e => e.Customer)
            .HasForeignKey(e => e.CustomerId);
    }
}