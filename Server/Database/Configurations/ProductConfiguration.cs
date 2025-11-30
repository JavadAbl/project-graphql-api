using Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        // --- Table Configuration ---
        builder.ToTable("Products");

        // --- Primary Key Configuration ---
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id)
            .ValueGeneratedOnAdd(); // Equivalent to DatabaseGeneratedOption.Identity

        // --- Column Properties Configuration ---

        // Name
        builder.Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(100);

        // Description
        // No configuration needed unless you want to set a default length, etc.
        // It will be mapped to a nullable nvarchar(max) by default.

        // SKU
        builder.Property(p => p.SKU)
            .IsRequired()
            .HasMaxLength(50);

        // Create the unique index on the SKU column
        builder.HasIndex(p => p.SKU)
            .IsUnique();

        // Price
        builder.Property(p => p.Price)
            .IsRequired()
            .HasColumnType("decimal(10, 2)");

        // StockQuantity
        builder.Property(p => p.StockQuantity)
            .IsRequired();

        // --- Navigation Properties Configuration ---

        // A product can be in many factor orders (line items).
        // This configures the one-to-many relationship.
        builder.HasMany(p => p.FactorOrders)
               .WithOne(e => e.Product)
               .HasForeignKey(f => f.ProductID);
    }
}
