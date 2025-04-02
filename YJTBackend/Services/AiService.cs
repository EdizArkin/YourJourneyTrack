// Services/AiService.cs
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace YJTBackend.Services
{
    public class AiService
    {
        private readonly HttpClient _httpClient;

        public AiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GetAiResponseAsync(string input)
        {
            var response = await _httpClient.PostAsync("AI_API_ENDPOINT", new StringContent(JsonConvert.SerializeObject(new { input }), System.Text.Encoding.UTF8, "application/json"));
            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();
            return responseBody; // AI API'sinden dönen yanıt
        }
    }
}
