namespace Entities;

public class User
{
    public int Id { get; set; }

    public string Username { get; set; } = string.Empty;

    public byte[] PasswordHash { get; set; } = new byte[32];

    public byte[] PasswordSalt { get; set; } = new byte[32];

    public List<Entry> Entries { get; set; } = new List<Entry>();
}
