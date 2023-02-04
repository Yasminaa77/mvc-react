using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// pass the buider a whole bunch of setting and stuff

builder.Services.AddDbContext<MyAppDb>(opt => opt.UseInMemoryDatabase("Cats"));

//HERE
var port = Environment.GetEnvironmentVariable("PORT") ?? "8081";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");


var app = builder.Build();

//HERE
// app.MapGet("/", () => "Hello World!");
//everytjing coming out of "Map" functions it has been tried to be a json (usually not the strings)


app.MapGet("/api/cats", async (MyAppDb db) =>{
    return await db.Cats.ToListAsync();
});


// app.MapGet("/todoitems/{id}", async (int id, TodoDb db) =>
//     await db.Todos.FindAsync(id)
//         is Todo todo
//             ? Results.Ok(todo)
//             : Results.NotFound());

app.MapGet("/api/cats/{id}", async (int id, MyAppDb db) =>{
    return await db.Cats.FindAsync(id);
});
            


app.MapPost("/api/cats", async (MyAppDb db, Cat cat) =>
{
    db.Cats.Add(cat);
    await db.SaveChangesAsync();
    return Results.Created($"/api/cats/{cat.Id}", cat);
});



app.MapPut("/api/cats/{id}", async (int id, Cat inputCat, MyAppDb db) =>
{
    var cat = await db.Cats.FindAsync(id);

    if (cat is null) return Results.NotFound();

    cat.Name = inputCat.Name;
    cat.Race = inputCat.Race;
    cat.Color = inputCat.Color;


    await db.SaveChangesAsync();
    return Results.NoContent();
});


app.MapDelete("/api/cats/{id}", async (int id, MyAppDb db) =>
{
    Console.WriteLine(id);
    if (await db.Cats.FindAsync(id) is Cat cat)
    {
        db.Cats.Remove(cat);
        await db.SaveChangesAsync();
        return Results.Ok(cat);
        // return "yaaaa";
    }

    return Results.NotFound();
});





//this lines make the app use wwwroot
//HERE
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");




app.Run();
