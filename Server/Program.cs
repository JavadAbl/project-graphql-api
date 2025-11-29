using API.GraphQL;
using API.GraphQL.User;
using API.Interfaces.Repositories;
using API.Interfaces.Services;
using API.Repositories;
using API.Services;
using Database;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(op =>
{
    op.UseSqlite("Data Source=app.db");
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

//Serivces------------------------------------------------------
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddGraphQLServer()
    .AddQueryType<Query>()
    .AddType<BranchQueryResolvers>()
    .AddType<BranchType>()
    .AddMutationType<Mutation>()
    .AddType<BranchMutationResolvers>();


//Repositories------------------------------------------------------
builder.Services.AddScoped<IUserRepository, UserRepository>();

//App------------------------------------------------------
var app = builder.Build();
app.UseCors("AllowFrontend");

app.MapGraphQL();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();

    // This will create the database if it doesn't exist and apply the seed data.
    // It's great for development and initial setup.
    context.Database.EnsureCreated();

    // For production, you would typically use Migrations instead:
    // context.Database.Migrate();
}

app.Run();
