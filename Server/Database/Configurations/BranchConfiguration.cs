using API.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations;

public class BranchConfiguration : IEntityTypeConfiguration<Branch>
{
    public void Configure(EntityTypeBuilder<Branch> builder)
    {
        // --- Table Configuration ---
        builder.ToTable("Branches");

        // --- Primary Key Configuration ---
        builder.HasKey(b => b.Id);
        builder.Property(b => b.Id)
            .ValueGeneratedOnAdd(); // Equivalent to DatabaseGeneratedOption.Identity

        // --- Column Properties Configuration ---

        // Name
        builder.Property(b => b.Name)
            .IsRequired()
            .HasMaxLength(100);

        // Phone
        builder.Property(b => b.Phone)
            .HasMaxLength(20);

        // Location
        builder.Property(b => b.Location)
            .HasMaxLength(255);

        // --- Navigation Properties Configuration ---

        // A branch can have many users (employees).
        // This configures the one-to-many relationship.
        builder.HasMany(b => b.Users)
               .WithOne() // Assumes User has a reference back to Branch
               .HasForeignKey(u => u.BranchId); // Assumes the foreign key property in User is named BranchID

        // A branch can have many factors (sales).
        // This configures the one-to-many relationship.
        builder.HasMany(b => b.Factors)
               .WithOne()
               .HasForeignKey(f => f.BranchId);
    }
}