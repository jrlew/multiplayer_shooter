using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
using Shooter.Game;
using Shooter.Helpers;

namespace Shooter.Hubs
{
    public class GameHub : Hub
    {
        public async Task Register()
        {
            var player = State.AddPlayer();
            await Clients.Caller.SendAsync("RegistrationComplete", player.Id);
        }

        public async Task GetPlayerLocation(Guid playerId)
        {
            Console.WriteLine("GetPlayerLocation Called");

            var player = State.GetPlayerById(playerId);

            await Clients.Caller.SendAsync("PlayerLocation", player.Id, player.Location);
        }

        public void GetPlayers()
        {
            State.Players.ForEach(async (player) =>
            {
                await Clients.Caller.SendAsync("PlayerLocation", player.Id, player.Location);
            });
        }

        public void UpdatePlayer(Player player)
        {
            var playerToUpdate = State.GetPlayerById(player.Id);
            playerToUpdate.Location = player.Location;
        }

        public void UpdatePlayerLocation(Guid playerId, string newCoordinate)
        {
            Console.WriteLine("UpdatePlayerLocation Called");

            Coordinates newCoords = JsonConverter.Deserialize<Coordinates>(newCoordinate);
            State.GetPlayerById(playerId).Location = newCoords;
        }
    }
}
