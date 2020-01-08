using System;
using System.Collections.Generic;

namespace Shooter.Game
{
    public static class State
    {
        public static List<Player> Players { get; set; }
        public static List<Projectile> Projectiles { get; set; }

        public static void Initialize()
        {
            Players = new List<Player>();
        }

        public static Player AddPlayer()
        {
            var player = new Player();
            Players.Add(player);
            return player;
        }

        public static Player GetPlayerById(Guid playerId)
        {
            return Players.Find(x => x.Id == playerId);
        }
    }
}
