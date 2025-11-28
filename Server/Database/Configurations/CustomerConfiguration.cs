using Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations;

public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
{
    public void Configure(EntityTypeBuilder<Customer> builder)
    {
        // Table configuration
        // builder.ToTable("Customers");
        builder.HasIndex(e => e.Email).IsUnique();

        // Primary key configuration
        builder.HasKey(c => c.Id);
        builder.Property(c => c.Id)
            .ValueGeneratedOnAdd(); // Equivalent to DatabaseGeneratedOption.Identity

        // FirstName configuration
        builder.Property(c => c.FirstName)
            .IsRequired()
            .HasMaxLength(50);

        // LastName configuration
        builder.Property(c => c.LastName)
            .IsRequired()
            .HasMaxLength(50);

        // Email configuration
        builder.Property(c => c.Email)
            .IsRequired()
            .HasMaxLength(100);


        // Phone configuration
        builder.Property(c => c.Phone)
            .HasMaxLength(20);

        // Navigation properties configuration
        builder.HasMany(c => c.Addresses)
            .WithOne() // Assuming there's a Customer reference in Address
            .HasForeignKey("CustomerID"); // Assuming the foreign key property name

        builder.HasMany(c => c.Factors)
            .WithOne() // Assuming there's a Customer reference in Factor
            .HasForeignKey("CustomerID"); // Assuming the foreign key property name
    }
}