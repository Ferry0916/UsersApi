
namespace UsersApi.Models;

public class UserItemDTO
{
    private List<User> users;

    public UserItemDTO(List<User> users)
    {
        this.users = users;
    }

    public string? Id { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Phone { get; set; }
    public int UserStatus { get; set; }
}