namespace takjeeel.Server.Services;

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using takjeeel.Server.Infrastructure;
using takjeeel.Server.Models;

public class TakjilService : ITakjilService
{
    private readonly AppTakjilDBContext _dbContext;

    public TakjilService(AppTakjilDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Takjil?> AddTakjilAsync(Takjil takjil)
    {
        _dbContext.Takjils.Add(takjil);
        await _dbContext.SaveChangesAsync();
        return takjil;
    }

    public async Task<(bool Succeeded, string[] Errors)> DeleteTakjilAsync(int takjilId)
    {
        var takjil = await _dbContext.Takjils.FindAsync(takjilId);
        if (takjil == null)
            return (false, new string[] { "Takjil not found" });

        _dbContext.Takjils.Remove(takjil);
        await _dbContext.SaveChangesAsync();
        return (true, Array.Empty<string>());
    }

    public async Task<Takjil?> GetTakjilAsync(int takjilId)
    {
        return await _dbContext.Takjils.FindAsync(takjilId);
    }

    public async Task<(List<Takjil>, int)> GetTakjilsAsync(int page, int pageSize)
    {
        return (await _dbContext.Takjils.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync(), await _dbContext.Takjils.CountAsync());
    }

    public async Task<(bool Succeeded, string[] Errors)> UpdateTakjilAsync(Takjil takjil)
    {
        var currTakjil = await _dbContext.Takjils.FindAsync(takjil.TakjilId);
        if (currTakjil == null)
        {
            return (false, new string[] { "Takjil not found" });
        }
        currTakjil.Foods = takjil.Foods;
        currTakjil.Date = takjil.Date;
        currTakjil.Description = takjil.Description;
        currTakjil.Quantity = takjil.Quantity;

        await _dbContext.SaveChangesAsync();
        return (true, Array.Empty<string>());
    }
}