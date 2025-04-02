// Services/NftService.cs
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;



namespace YJTBackend.Services
{

    public class NftService
    {
        private readonly HttpClient _httpClient;

        public NftService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> CreateNftAsync(string imageUri, string metadata)
        {
            var nftRequest = new { imageUri, metadata };
            var response = await _httpClient.PostAsync("NFT_API_ENDPOINT", new StringContent(JsonConvert.SerializeObject(nftRequest), System.Text.Encoding.UTF8, "application/json"));
            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();
            return responseBody; // NFT API'sinden dönen yanıt
        }
    }
}