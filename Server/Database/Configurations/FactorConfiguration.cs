using API.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations;


public class FactorConfiguration : IEntityTypeConfiguration<Factor>
{
    public void Configure(EntityTypeBuilder<Factor> builder)
    {
        // --- Table Configuration ---
        builder.ToTable("Factors");

        // --- Primary Key Configuration ---
        builder.HasKey(f => f.Id);
        builder.Property(f => f.Id)
            .ValueGeneratedOnAdd(); // Equivalent to DatabaseGeneratedOption.Identity

        // --- Column Properties Configuration ---

        // FactorDate
        builder.Property(f => f.FactorDate)
            .IsRequired();

        // TotalAmount
        builder.Property(f => f.TotalAmount)
            .IsRequired();
        //   .HasColumnType("decimal(10, 2)");

        // PaymentMethod
        builder.Property(f => f.PaymentMethod)
            .IsRequired()
            .HasMaxLength(50);

        // Status
        builder.Property(f => f.Status)
            .IsRequired()
            .HasMaxLength(20);

        // --- Relationships Configuration ---

        // --- Factor to Customer Relationship (Many-to-One) ---
        builder.HasOne(f => f.Customer)
               .WithMany(c => c.Factors)
               .HasForeignKey(f => f.CustomerId)
               .OnDelete(DeleteBehavior.Restrict); // A factor shouldn't delete its customer

        // --- Factor to Seller (User) Relationship (Many-to-One) ---
        builder.HasOne(f => f.User)
               .WithMany()
               .HasForeignKey(f => f.UserId)
               .OnDelete(DeleteBehavior.Restrict); // Don't delete the user if they have factors

        // --- Factor to Branch Relationship (Many-to-One) ---
        builder.HasOne(f => f.Branch)
               .WithMany(b => b.Factors)
               .HasForeignKey(f => f.BranchId)
               .OnDelete(DeleteBehavior.Restrict); // Don't delete the branch if it has factors

        // --- Factor to DeliveryAddress Relationship (Optional One-to-One) ---
        // The foreign key property 'DeliveryAddressID' is nullable (int?),
        // so EF Core will correctly configure this as an optional relationship.
        builder.HasOne(f => f.DeliveryAddress)
               .WithMany()
               .HasForeignKey(f => f.DeliveryAddressId);


        builder.HasMany(f => f.FactorOrders)
               .WithOne(fo => fo.Factor)
               .HasForeignKey(fo => fo.FactorID);
    }
}
