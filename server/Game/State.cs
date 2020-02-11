using Microsoft.AspNetCore.SignalR;
using Shooter.Hubs;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System.Threading;

namespace Shooter.Game
{
    public static class State
    {
        public static List<Player> Players { get; set; }
        public static List<Projectile> Projectiles { get; set; }
        public static Thread ClientUpdateThread { get; set; }
        public static IHubContext<GameHub> GameHubContext { get; set; }

        public static void Initialize(IHubContext<GameHub> gameHubContext)
        {
            GameHubContext = gameHubContext;
            Players = new List<Player>();
            Projectiles = new List<Projectile>();

            ClientUpdateThread = new Thread(ClientUpdate);
            ClientUpdateThread.Start(GameHubContext);
        }

        public static Player AddPlayer(string playerId)
        {
            var player = new Player(playerId);
            Players.Add(player);
            return player;
        }

        public static Player GetPlayerById(string playerId)
        {
            return Players.Find(x => x.Id == playerId);
        }

        public static SerializableState GetState()
        {
            var state = new SerializableState
            {
                Players = State.Players,
                Projectiles = State.Projectiles
            };

            return state;
        }

        public static void RemovePlayer(string playerId)
        {
            var player = GetPlayerById(playerId);
            Players.Remove(player);
        }

        public static void ClientUpdate(object obj)
        {
            while (true)
            {
                Thread.Sleep(500);
                Console.WriteLine("Sending State");
                GameHubContext.Clients.Group("Players").SendAsync(ClientMethods.ReceiveState, GetState());
            }
        }
    }

    public class SerializableState
    {
        [JsonPropertyName("players")]
        public List<Player> Players { get; set; }
        [JsonPropertyName("projectiles")]
        public List<Projectile> Projectiles { get; set; }
    }
}
