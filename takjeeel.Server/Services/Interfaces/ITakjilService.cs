// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2024 www.ebenmonney.com/mit-license
// ---------------------------------------

using takjeeel.Server.Models;

namespace takjeeel.Server.Services
{
    public interface ITakjilService
    {
        Task<Takjil?> AddTakjilAsync(Takjil takjil);
        Task<(bool Succeeded, string[] Errors)> DeleteTakjilAsync(int takjilId);
        Task<Takjil?> GetTakjilAsync(int takjilId);
        Task<(List<Takjil>, int)> GetTakjilsAsync(int page, int pageSize);
        Task<(bool Succeeded, string[] Errors)> UpdateTakjilAsync(Takjil takjil);
    }
}
