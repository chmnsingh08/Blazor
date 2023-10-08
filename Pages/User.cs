using Data.Model;

namespace BlazorApp.Pages
{
    public partial class User
    {
        public static List<UserModel> UsersList { get; } = new List<UserModel>
         {
           new UserModel { Id = 1, Name = "John Doe", Age = 30, ContactNumber = "123-456-7890" },
           new UserModel { Id = 2, Name = "Jane Smith", Age = 25, ContactNumber = "987-654-3210" },
         };
        /// <summary>
        /// get users list
        /// </summary>
        /// <returns></returns>
        public static List<UserModel> GetUserList()
        {
            return UsersList.ToList();
        }

        /// <summary>
        /// add user
        /// </summary>
        /// <param name="user"></param>
        public static void AddUser(UserModel user)
        {
            user.Id = UsersList.Max(x => x.Id) + 1;
            UsersList.Add(user);
        }

        /// <summary>
        /// get user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public static UserModel GetUser(int id)
        {
            return UsersList.Find(x => x.Id == id) ?? throw new Exception("User not found!");
            
        }
    }
}
