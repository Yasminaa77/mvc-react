using System.ComponentModel.DataAnnotations;

class Cat {
    public int Id {get; set;}
    [Required]
    public string? Name {get; set;}
    public string? Race {get; set;}
    public string? Color {get; set;}
    //instead of typing each prop just type "prop" and click
    public DateTime? Created {get; set;} = DateTime.Now;
}