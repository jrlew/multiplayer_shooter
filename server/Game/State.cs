using System;
using System.Collections.Generic;

namespace Shooter.Game
{
    public static class State
    {
        public static List<Player> PlayerList { get; set; }

        public static void Initialize()
        {
            PlayerList = new List<Player>();
        }

        public static Player AddPlayer()
        {
            var player = new Player();
            PlayerList.Add(player);
            return player;
        }

        public static Player GetPlayerById(Guid playerId)
        {
            return PlayerList.Find(x => x.Id == playerId);
        }
    }
}
