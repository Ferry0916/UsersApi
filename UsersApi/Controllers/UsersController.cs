using UsersApi.Models;
using UsersApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace UsersApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : Controller
{
    private readonly UserService _userService;

    public UsersController(UserService userService) =>
        _userService = userService;

    [HttpGet]
    public async Task<List<UserItemDTO>> Get()
    {
        var users = await _userService.GetAsync();
        return users.Select(user => new UserItemDTO(user)).ToList();
    }

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<UserItemDTO>> Get(string id)
    {
        var user = await _userService.GetAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        return new UserItemDTO(user);
    }

    [HttpPost]
    public async Task<IActionResult> Post(UserItemDTO newUser)
    {
        var user = new User
        {
            Id = newUser.Id,
            Username = newUser.Username,
            Email = newUser.Email,
            FirstName = newUser.FirstName,
            LastName = newUser.LastName,
            Password = newUser.Password,
            Phone = newUser.Phone,
            UserStatus = newUser.UserStatus
        };
        
        await _userService.CreateAsync(user);

        return CreatedAtAction(nameof(Get), new { id = newUser.Id }, new UserItemDTO(user));
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, UserItemDTO userDTO)
    {
        var user = await _userService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        var userUpdate = new User
        {
            Id = userDTO.Id,
            Email = userDTO.Email,
            FirstName = userDTO.FirstName,
            LastName = userDTO.LastName,
            Username = userDTO.Username,
            Password = userDTO.Password,
            Phone = userDTO.Phone,
            UserStatus = userDTO.UserStatus
        };

        await _userService.UpdateAsync(id, userUpdate);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var user = await _userService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        await _userService.RemoveAsync(id);

        return NoContent();
    }
}