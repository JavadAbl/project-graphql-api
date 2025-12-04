using API.GraphQL;
using API.GraphQL.Address;
using API.GraphQL.Branch;
using API.GraphQL.Customer;
using API.GraphQL.Factor;
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
builder.Services.AddScoped<IBranchService, BranchService>();
builder.Services.AddScoped<IAddressService, AddressService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();

//Graphql------------------------------------------------------
builder.Services.AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddProjections()
    .AddFiltering()
    .AddSorting()
    .ModifyPagingOptions(options =>
    {
        options.MaxPageSize = 100;           // Maximum items per page
        options.DefaultPageSize = 10;        // Default page size when not specified
        options.IncludeTotalCount = true;   // Whether to include total count
        options.AllowBackwardPagination = true; // Allow "last" and "before" arguments
        options.RequirePagingBoundaries = false; // Whether first/last are required
    })
    //Users
    .AddType<UserQueryResolvers>()
    .AddType<UserMutationResolvers>()
    .AddType<UserType>()
    //Branch
    .AddType<BranchQueryResolvers>()
    .AddType<BranchMutationResolvers>()
    .AddType<BranchType>()
    //Factor
    .AddType<FactorQueryResolvers>()
    .AddType<FactorMutationResolvers>()
    .AddType<FactorType>()
    //Customer
    .AddType<CustomerQueryResolvers>()
    .AddType<CustomerMutationResolvers>()
    .AddType<CustomerType>()
    //Address
    .AddType<AddressQueryResolvers>()
    .AddType<AddressMutationResolvers>()
    .AddType<AddressType>();


//Repositories------------------------------------------------------
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IBranchRepository, BranchRepository>();
builder.Services.AddScoped<IAddressRepository, AddressRepository>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<IFactorRepository, FactorRepository>();

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
