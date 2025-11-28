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
//builder.Services.AddDbContextFactory<AppDbContext>(options =>
//    options.UseSqlite("Data Source=app.db"));

//Serivces------------------------------------------------------
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddGraphQLServer()
    .AddQueryType<Query>()
    .AddType<UserQueryResolvers>()
    .AddType<UserType>()
    .AddMutationType<Mutation>()
    .AddType<UserMutationResolvers>();


//Repositories------------------------------------------------------
builder.Services.AddScoped<IUserRepository, UserRepository>();

//App------------------------------------------------------
var app = builder.Build();
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
