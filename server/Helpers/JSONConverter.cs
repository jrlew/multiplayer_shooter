using System.Text.Json;

namespace Shooter.Helpers
{
    public sealed class JsonConverter
    {
        public static readonly JsonSerializerOptions JSONConverterOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        public static T Deserialize<T>(string jsonString) 
        {
            return JsonSerializer.Deserialize<T>(jsonString, JSONConverterOptions);
        }
    }
}
