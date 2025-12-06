using API.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Database.Configurations;

public class FactorOrderConfiguration : IEntityTypeConfiguration<FactorOrder>
{
    public void Configure(EntityTypeBuilder<FactorOrder> builder)
    {
        builder.ToTable("FactorOrders");

        builder.HasKey(fo => fo.Id);
        builder.Property(fo => fo.Id)
            .ValueGeneratedOnAdd();

        builder.Property(fo => fo.Count);

        // --- FactorOrder to Factor Relationship (Many-to-One) ---
        // Many factor order items can belong to a single factor.
        builder.HasOne(fo => fo.Factor)
               .WithMany(f => f.FactorOrders) // Assumes Factor has a 'FactorOrders' collection
               .HasForeignKey(fo => fo.FactorId)
               .OnDelete(DeleteBehavior.Cascade); // If a Factor is deleted, its line items should be deleted too.

        // --- FactorOrder to Product Relationship (Many-to-One) ---
        // Many factor order items can reference the same product.
        builder.HasOne(fo => fo.Product)
               .WithMany(p => p.FactorOrders)
               .HasForeignKey(fo => fo.ProductId)
               .OnDelete(DeleteBehavior.Restrict);
    }
}