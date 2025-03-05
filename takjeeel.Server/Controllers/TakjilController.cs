using Microsoft.AspNetCore.Mvc;
using takjeeel.Server.Models;
using takjeeel.Server.Services;

namespace takjeeel.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TakjilController : ControllerBase
    {
        private readonly ITakjilService _takjilService;
        private readonly ILogger<TakjilController> _logger;

        public TakjilController(ILogger<TakjilController> logger, ITakjilService takjilService)
        {
            _logger = logger;
            _takjilService = takjilService;
        }

        [HttpGet(Name = "GetTakjil")]
        public async Task<GetTakjilsResponse> GetTakjils(int pageNumber = -1, int pageSize = -1)
        {
            var (takjils, totalPages) = await _takjilService.GetTakjilsAsync(pageNumber, pageSize);
            return new GetTakjilsResponse
            {
            Takjils = takjils,
            TotalPages = totalPages
            };
        }

        [HttpPost(Name="PostTakjil")]
        public async Task<Takjil> PostTakjil([FromBody]Takjil takjil)
        {
            var result = await _takjilService.AddTakjilAsync(takjil);
            if (result != null) {
                return result;
            } else {
                throw new Exception("Failed to add takjil");
            }
        }

        [HttpDelete(Name="DeleteTakjil")]
        public async Task<bool> DeleteTakjil(int id)
        {
            var (Succeeded, Errors) = await _takjilService.DeleteTakjilAsync(id);
            if (Succeeded) {
                return true;
            } else {
                throw new Exception("Failed to delete takjil : " + string.Join(", ", Errors));
            }
        }

        public class GetTakjilsResponse
        {
            public IEnumerable<Takjil>? Takjils { get; set; }
            public int TotalPages { get; set; }
        }

    }
}
