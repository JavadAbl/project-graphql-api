using Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Database.Configurations;

public class FactorOrderConfiguration : IEntityTypeConfiguration<FactorOrder>
{
    public void Configure(EntityTypeBuilder<FactorOrder> builder)
    {
        // --- Table Configuration ---
        // builder.ToTable("FactorOrders");

        // --- Primary Key Configuration ---
        builder.HasKey(fo => fo.Id);
        builder.Property(fo => fo.Id)
            .ValueGeneratedOnAdd(); // Equivalent to DatabaseGeneratedOption.Identity

        // --- Column Properties Configuration ---

        // Quantity
        builder.Property(fo => fo.Quantity)
            .IsRequired();

        // UnitPrice
        builder.Property(fo => fo.UnitPrice)
            .IsRequired();
        //   .HasColumnType("decimal(10, 2)");

        // --- Relationships Configuration ---

        // --- FactorOrder to Factor Relationship (Many-to-One) ---
        // Many factor order items can belong to a single factor.
        builder.HasOne(fo => fo.Factor)
               .WithMany(f => f.FactorOrders) // Assumes Factor has a 'FactorOrders' collection
               .HasForeignKey(fo => fo.FactorID)
               .OnDelete(DeleteBehavior.Cascade); // If a Factor is deleted, its line items should be deleted too.

        // --- FactorOrder to Product Relationship (Many-to-One) ---
        // Many factor order items can reference the same product.
        builder.HasOne(fo => fo.Product)
               .WithMany(p => p.FactorOrders) // Assumes Product has a 'FactorOrders' collection
               .HasForeignKey(fo => fo.ProductID)
               .OnDelete(DeleteBehavior.Restrict); // Prevent deleting a product if it's part of an order.
    }
}