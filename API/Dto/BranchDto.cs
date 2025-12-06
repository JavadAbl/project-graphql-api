namespace API.Dto;

public class BranchDto
{
    [IsProjected]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
    public string Location { get; set; }
}

