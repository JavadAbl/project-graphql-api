using Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations;

public class AddressConfiguration : IEntityTypeConfiguration<Address>
{
    public void Configure(EntityTypeBuilder<Address> builder)
    {
        // --- Table Configuration ---
        builder.ToTable("Addresses");

        // --- Primary Key Configuration ---
        builder.HasKey(a => a.Id);
        builder.Property(a => a.Id)
            .ValueGeneratedOnAdd(); // Equivalent to DatabaseGeneratedOption.Identity

        // --- Column Properties Configuration ---

        // AddressLine1
        builder.Property(a => a.AddressLine1)
            .IsRequired()
            .HasMaxLength(255);

        // AddressLine2
        builder.Property(a => a.AddressLine2)
            .HasMaxLength(255);

        // City
        builder.Property(a => a.City)
            .IsRequired()
            .HasMaxLength(100);

        // State
        builder.Property(a => a.State)
            .IsRequired()
            .HasMaxLength(100);

        // PostalCode
        builder.Property(a => a.PostalCode)
            .IsRequired()
            .HasMaxLength(20);

        // Country
        builder.Property(a => a.Country)
            .IsRequired()
            .HasMaxLength(100);

        // AddressType
        builder.Property(a => a.AddressType)
            .IsRequired()
            .HasMaxLength(50);

        // --- Relationship Configuration ---

        // --- Address to Customer Relationship (Many-to-One) ---
        // An address belongs to one customer.
        // EF Core will automatically use the 'CustomerID' property as the foreign key.
        builder.HasOne(a => a.Customer)
               .WithMany(c => c.Addresses) // Assumes Customer has a navigation property 'Addresses'
               .HasForeignKey(a => a.CustomerID)
               .OnDelete(DeleteBehavior.Cascade); // Optional: Specify delete behavior
    }
}
