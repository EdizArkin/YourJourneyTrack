using Microsoft.EntityFrameworkCore;
using YJTBackend.Models;  // UserGoal sınıfını kullanabilmek için ekle

namespace YJTBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

        public DbSet<UserGoal> UserGoals { get; set; }  // Veritabanı için UserGoal tablosu oluşturur
    }
}
