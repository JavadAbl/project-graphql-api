using API.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products");

        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id)
            .ValueGeneratedOnAdd();

        builder.Property(p => p.Name)
            .HasMaxLength(100);

        builder.Property(p => p.SKU)
            .HasMaxLength(50);

        builder.HasIndex(p => p.SKU)
            .IsUnique();

        builder.Property(p => p.Price)
            .HasColumnType("decimal(10, 2)");

        builder.Property(p => p.StockQuantity);

        // --- Navigation Properties Configuration ---

        // A product can be in many factor orders (line items).
        // This configures the one-to-many relationship.
        builder.HasMany(p => p.FactorOrders)
               .WithOne(e => e.Product)
               .HasForeignKey(f => f.ProductId);
    }
}
