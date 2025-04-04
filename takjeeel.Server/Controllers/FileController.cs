using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace takjeeel.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<FileController> _logger;
        private const string UploadsFolder = "Uploads";

        public FileController(IWebHostEnvironment environment, ILogger<FileController> logger)
        {
            _environment = environment;
            _logger = logger;
        }

        [HttpPost("upload")]
        [RequestSizeLimit(10_000_000)]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var uploadsPath = Path.Combine(_environment.ContentRootPath, UploadsFolder);
            if (!Directory.Exists(uploadsPath))
                Directory.CreateDirectory(uploadsPath);

            var safeFileName = Path.GetFileName(file.FileName);
            var filePath = Path.Combine(uploadsPath, safeFileName);

            try
            {
                using var stream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(stream);
                return Ok(new { filePath });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading file");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("download/{fileName}")]
        public IActionResult Download(string fileName)
        {
            var uploadsPath = Path.Combine(_environment.ContentRootPath, UploadsFolder);
            var filePath = Path.Combine(uploadsPath, fileName);

            if (!System.IO.File.Exists(filePath))
                return NotFound("File not found.");

            var mimeType = "application/octet-stream";
            return PhysicalFile(filePath, mimeType, fileName);
        }
    }
}