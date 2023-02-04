using Microsoft.EntityFrameworkCore;

class MyAppDb : DbContext
{
    public MyAppDb(DbContextOptions<MyAppDb> options)
        : base(options) { }

    public DbSet<Cat> Cats => Set<Cat>();
}
