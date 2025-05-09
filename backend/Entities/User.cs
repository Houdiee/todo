using System.ComponentModel.DataAnnotations;

namespace Entities;

public class User
{
    public int Id { get; set; }

    public string Username { get; set; } = string.Empty;

    public byte[] PasswordHash { get; set; } = new byte[32];

    public byte[] PasswordSalt { get; set; } = new byte[32];

    public List<Entry> Entries { get; set; } = new List<Entry>();
}

public class UserDto
{
    [Required]
    public string Username { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public List<EntryDto> Entries { get; set; } = new List<EntryDto>();


    public static UserDto FromEntity(User userEntity)
    {
        return new UserDto
        {
            Username = userEntity.Username,
            Password = string.Empty,
            Entries = userEntity.Entries.Select(e => EntryDto.FromEntity(e)).ToList(),
        };
    }
}
