using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using YJTBackend.Data;

var builder = WebApplication.CreateBuilder(args);

// Load .env file
Env.Load(); // Bu satır, .env dosyasındaki verileri yükler

var host = Environment.GetEnvironmentVariable("DB_HOST");
var port = Environment.GetEnvironmentVariable("DB_PORT");
var db = Environment.GetEnvironmentVariable("DB_NAME");
var user = Environment.GetEnvironmentVariable("DB_USER");
var pass = Environment.GetEnvironmentVariable("DB_PASSWORD");

if (string.IsNullOrEmpty(host) || string.IsNullOrEmpty(port) || string.IsNullOrEmpty(db) || string.IsNullOrEmpty(user) || string.IsNullOrEmpty(pass))
{
    throw new InvalidOperationException("One or more environment variables are missing.");
}

var connectionString = $"Host={host};Port={port};Database={db};Username={user};Password={pass}";

// Add database context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();

app.UseRouting();
app.MapControllers();
app.Run();
