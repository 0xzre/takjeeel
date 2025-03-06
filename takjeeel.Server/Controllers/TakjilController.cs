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
        public async Task<GetTakjilsResponse> GetAllTakjil(int pageNumber = -1, int pageSize = -1)
        {
            var (takjils, totalPages) = await _takjilService.GetTakjilsAsync(pageNumber, pageSize);
            return new GetTakjilsResponse
            {
            Takjils = takjils,
            TotalPages = totalPages
            };
        }

        [HttpPost(Name="PostTakjil")]
        public async Task<IActionResult> PostTakjil([FromBody]Takjil takjil)
        {
            var result = await _takjilService.AddTakjilAsync(takjil);
            if (result != null) {
                return Ok(result);
            } else {
                return BadRequest("Failed to add takjil");
            }
        }

        [HttpPut(Name="PutTakjil")]
        public async Task<IActionResult> PutTakjil([FromBody]Takjil takjil)
        {
            var (Succeeded, Errors) = await _takjilService.UpdateTakjilAsync(takjil);
            if (Succeeded) {
                return Ok(Succeeded);
            } else {
                return BadRequest("Failed to update takjil : " + string.Join(", ", Errors));
            }
        }

        [HttpDelete(Name="DeleteTakjil")]
        public async Task<IActionResult> DeleteTakjil(int id)
        {
            var (Succeeded, Errors) = await _takjilService.DeleteTakjilAsync(id);
            if (Succeeded) {
                return Ok(Succeeded);
            } else {
                return BadRequest("Failed to delete takjil : " + string.Join(", ", Errors));
            }
        }

        public class GetTakjilsResponse
        {
            public IEnumerable<Takjil>? Takjils { get; set; }
            public int TotalPages { get; set; }
        }

    }
}
