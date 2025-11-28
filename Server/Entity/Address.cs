namespace Entity;

public class Address
{
    public int Id { get; set; }
    public string AddressLine1 { get; set; }
    public string AddressLine2 { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string PostalCode { get; set; }
    public string Country { get; set; }
    public string AddressType { get; set; }

    // --- Foreign Key Property ---
    public int CustomerID { get; set; }

    // --- Navigation Property ---
    public virtual Customer Customer { get; set; }
}