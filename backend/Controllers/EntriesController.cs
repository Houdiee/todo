using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Entities;

[ApiController]
[Route("api/[controller]")]
public class EntriesController : ControllerBase
{
    private readonly TodoDbContext _context;

    public EntriesController(TodoDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult> updateEntries([FromBody] UserDto request)
    {
        try
        {
            var user = await _context.Users
              .Include(u => u.Entries)
              .FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user is null)
            {
                return NotFound($"User with username: {request.Username} does not exit");
            }

            var userEntries = request.Entries.Select(e => new Entry
            {
                Title = e.Title,
                IsCompleted = e.IsCompleted,
            }).ToList();

            user.Entries.Clear();
            user.Entries.AddRange(userEntries);

            _context.Update(user);
            await _context.SaveChangesAsync();

            return Ok(UserDto.FromEntity(user));
        }
        catch (Exception e)
        {
            Console.WriteLine(e);

            return Problem(
                detail: "An unexpected problem occurred",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }
}
