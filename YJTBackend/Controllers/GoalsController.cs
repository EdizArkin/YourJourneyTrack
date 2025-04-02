using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YJTBackend.Data;
using YJTBackend.Models;

namespace YJTBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoalsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GoalsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET api/goals
        [HttpGet]
        public async Task<IActionResult> GetGoals()
        {
            var goals = await _context.UserGoals.ToListAsync();
            return Ok(goals);
        }
    }
}
