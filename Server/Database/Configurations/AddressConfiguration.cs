using API.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Database.Configurations;

public class AddressConfiguration : IEntityTypeConfiguration<Address>
{
    public void Configure(EntityTypeBuilder<Address> builder)
    {
        builder.ToTable("Addresses");

        builder.HasKey(a => a.Id);
        builder.Property(a => a.Id)
            .ValueGeneratedOnAdd(); // Equivalent to DatabaseGeneratedOption.Identity


        builder.Property(a => a.AddressLine1)
            .HasMaxLength(255);

        builder.Property(a => a.AddressLine2)
            .HasMaxLength(255);

        builder.Property(a => a.City)
            .HasMaxLength(100);

        builder.Property(a => a.State)
            .HasMaxLength(100);

        builder.Property(a => a.PostalCode)
            .HasMaxLength(20);

        builder.Property(a => a.Country)
            .HasMaxLength(100);

        builder.Property(a => a.AddressType)
            .HasMaxLength(50);

        // --- Relationship Configuration ---

        // --- Address to Customer Relationship (Many-to-One) ---
        // An address belongs to one customer.
        // EF Core will automatically use the 'CustomerID' property as the foreign key.
        builder.HasOne(a => a.Customer)
               .WithMany(c => c.Addresses)
               .HasForeignKey(a => a.CustomerId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
