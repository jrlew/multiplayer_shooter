using System;
using System.Text.Json.Serialization;

namespace Shooter.Game
{
    public class Player
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
        [JsonPropertyName("location")]
        public Coordinates Location { get; set; }

        public Player(string playerId)
        {
            Id = playerId;
            Location = new Coordinates(0, 0);
        }
    }
}
