using System.Xml.Linq;

namespace UsersApi.Models;

public class UserItemDTO
{
    public string? Id { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Phone { get; set; }
    public int UserStatus { get; set; }

    public UserItemDTO()
    {
        
    }

    public UserItemDTO(User userItem) =>
    (Id, Username, FirstName, LastName, Email, Password, Phone, UserStatus) = 
        (userItem.Id, userItem.Username, userItem.FirstName, userItem.LastName, 
        userItem.Email, userItem.Password, userItem.Phone, userItem.UserStatus);
}