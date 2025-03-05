using Microsoft.EntityFrameworkCore;
using takjeeel.Server.Models;

namespace takjeeel.Server.Infrastructure
{
    public class DatabaseSeeder(AppTakjilDBContext dbContext, ILogger<DatabaseSeeder> logger) : IDatabaseSeeder
{
    public async Task SeedAsync()
    {
        await dbContext.Database.MigrateAsync();
        await SeedTakjilsAsync();
    }

    private async Task SeedTakjilsAsync()
    {
        logger.LogInformation("Seeding database started...");
        if (await dbContext.Takjils.AnyAsync()) return;
        var descriptionList = new List<string>
            {
                "seger...",
                "gurih...",
                "enak coy...",
                "nikmat...",
                "mantap",
                "yumz",
            };
        var foodsList = new List<string>
            {
                "Kolak",
                "Gorengann",
                "Es Doger",
                "Jus jus",
                "Marugame",
                "Soto pak cecep",
            };
        var takjils = new List<Takjil>();
        var random = new Random();
        for (var i = 0; i < 30; i++)
        {
            var takjil = new Takjil
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(i)),
                Foods = foodsList[random.Next(foodsList.Count)],
                Description = descriptionList[random.Next(descriptionList.Count)],
                Quantity = random.Next(1000, 5000),
            };
            takjils.Add(takjil);
        }

        await dbContext.Takjils.AddRangeAsync(takjils);
        await dbContext.SaveChangesAsync();
        logger.LogInformation("Seeding database completed...");
    }
}

}