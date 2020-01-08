using System;
using System.Text.Json.Serialization;

namespace Shooter.Game
{
    public class Projectile
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }
        [JsonPropertyName("location")]
        public Coordinates Location { get; set; }

        public Projectile()
        {
            Id = Guid.NewGuid();
            Location = new Coordinates(0, 0);
        }
    }
}
