using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Entities;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly TodoDbContext _context;

    public UserController(TodoDbContext context)
    {
        _context = context;
    }

    [HttpGet("{username}")]
    public async Task<ActionResult> GetUser(string username)
    {
        var user = await _context.Users
          .Include(u => u.Entries)
          .FirstOrDefaultAsync(u => u.Username == username);

        if (user is null)
        {
            return NotFound($"User with username: \"{username}\" not found");
        }

        return Ok(UserDto.FromEntity(user));
    }

    [HttpPost]
    public async Task<ActionResult> SignUp([FromBody] UserDto request)
    {
        var user = await _context.Users
          .FirstOrDefaultAsync(u => u.Username == request.Username);

        if (user is not null)
        {
            return NotFound($"User with username: \"{request.Username}\" already exists");
        }

        if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
        {
            return BadRequest($"Username/password cannot be empty");
        }

        var salt = RandomNumberGenerator.GetBytes(32);

        var newUser = new User
        {
            Username = request.Username,
            PasswordHash = KeyDerivation.Pbkdf2(
                password: request.Password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 32
            ),
            PasswordSalt = salt,
            Entries = new List<Entry>(),
        };

        await _context.Users.AddAsync(newUser);
        await _context.SaveChangesAsync();

        return Ok(UserDto.FromEntity(newUser));
    }
}
