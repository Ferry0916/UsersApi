namespace UsersApi.Models
{
    public class UserDataDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set;} = null!;
        public string UsersCollectionName { get; set; } = null!;
    }
}