using System.ComponentModel.DataAnnotations;
namespace Entities;

public class Entry
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public bool IsCompleted { get; set; }

    public int UserId { get; set; }

    public User User { get; set; }
}

public class EntryDto
{
    [Required]
    public string Title { get; set; }

    [Required]
    public bool IsCompleted { get; set; }


    public static EntryDto FromEntity(Entry entryEntity)
    {
        return new EntryDto
        {
            Title = entryEntity.Title,
            IsCompleted = entryEntity.IsCompleted,
        };
    }
}
