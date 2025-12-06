using API.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {

        builder.ToTable("Users");

        builder.HasKey(u => u.Id);
        builder.Property(u => u.Id)
            .ValueGeneratedOnAdd();

        builder.Property(u => u.FirstName)
            .HasMaxLength(50);

        builder.Property(u => u.LastName)
            .HasMaxLength(50);

        builder.Property(u => u.Username)
            .HasMaxLength(50);

        builder.HasIndex(u => u.Username)
            .IsUnique();

        builder.Property(u => u.PasswordHash)
            .HasMaxLength(255);

        builder.Property(u => u.Role)
            .HasMaxLength(50);

        // --- Relationships Configuration ---

        // --- User to Branch Relationship (Many-to-One) ---
        // A user belongs to one branch.
        // This is the preferred way to configure a relationship when you have a foreign key property.
        // EF Core will automatically use the 'BranchID' property as the FK.
        builder.HasOne(u => u.Branch)
               .WithMany(b => b.Users)
               .HasForeignKey(u => u.BranchId);

        // --- User to Factor Relationship (One-to-Many) ---
        // A user can create many factors.
        /* builder.HasMany(u => u.CreatedFactors)
                .WithOne(f => f.User)
                .HasForeignKey(f => f.UserId);*/
    }
}
