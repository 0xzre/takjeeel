namespace takjeeel.Server.Models;
public class Takjil
{
	public int TakjilId { get; set; }
	public DateOnly Date { get; set; }
	public int Quantity { get; set; }
	required public string Foods { get; set; }
	public string? Description { get; set; }
}
