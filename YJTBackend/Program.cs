using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using YJTBackend.Data;
using YJTBackend.Services;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

Env.Load(); // Load environment variables from .env file

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

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddControllers();  // Gerekli servisleri ekleyin
builder.Services.AddHttpClient();
builder.Services.AddScoped<AiService>();
builder.Services.AddScoped<NftService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseRouting();

app.MapControllers(); // Kontrolcülerle eşleştirme yapın

app.Run();
