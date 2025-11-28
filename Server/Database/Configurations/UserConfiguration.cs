using Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {


        // --- Table Configuration ---
        //  builder.ToTable("Users");

        // --- Primary Key Configuration ---
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Id)
            .ValueGeneratedOnAdd(); // Equivalent to DatabaseGeneratedOption.Identity

        // --- Column Properties Configuration ---

        // FirstName
        builder.Property(u => u.FirstName)
            .IsRequired()
            .HasMaxLength(50);

        // LastName
        builder.Property(u => u.LastName)
            .IsRequired()
            .HasMaxLength(50);

        // Username
        builder.Property(u => u.Username)
            .IsRequired()
            .HasMaxLength(50);

        // Create the unique index on the Username column
        builder.HasIndex(u => u.Username)
            .IsUnique();

        // PasswordHash
        builder.Property(u => u.PasswordHash)
            .IsRequired()
            .HasMaxLength(255);

        // Role
        builder.Property(u => u.Role)
            .IsRequired()
            .HasMaxLength(50);

        // --- Relationships Configuration ---

        // --- User to Branch Relationship (Many-to-One) ---
        // A user belongs to one branch.
        // This is the preferred way to configure a relationship when you have a foreign key property.
        // EF Core will automatically use the 'BranchID' property as the FK.
        builder.HasOne(u => u.Branch)
               .WithMany(b => b.Users) // Assumes Branch has a navigation property 'Users'
               .HasForeignKey(u => u.BranchId);

        // --- User to Factor Relationship (One-to-Many) ---
        // A user can create many factors.
        builder.HasMany(u => u.CreatedFactors)
               .WithOne(f => f.User) // Assumes Factor has a navigation property 'User'
               .HasForeignKey(f => f.UserId); // Assumes the foreign key property in Factor is named UserID
    }
}
