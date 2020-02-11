using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
using Shooter.Game;
using Shooter.Helpers;

namespace Shooter.Hubs
{
    public class GameHub : Hub
    {
        public async override Task OnConnectedAsync()
        {
            var player = State.AddPlayer(Context.ConnectionId);
            await Groups.AddToGroupAsync(Context.ConnectionId, "Players");
            await Clients.Caller.SendAsync(ClientMethods.RegistrationComplete, player.Id);

            await base.OnConnectedAsync();
        }

        public async override Task OnDisconnectedAsync(Exception exception)
        {
            Console.WriteLine("Deregistering");
            State.RemovePlayer(Context.ConnectionId);
            Console.WriteLine(State.Players.Count);

            await base.OnDisconnectedAsync(exception);
        }

        //public void Deregister(string playerId)
        //{
        //    Console.WriteLine("Deregistering");
        //    State.RemovePlayer(playerId);
        //    Console.WriteLine(State.Players.Count);
        //}

        //public async Task Register()
        //{
        //    var player = State.AddPlayer();
        //    await Clients.Caller.SendAsync(ClientMethods.RegistrationComplete, player.Id);
        //}

        public async Task GetCurrentState()
        {
            await Clients.Caller.SendAsync(ClientMethods.ReceiveState, State.GetState());
        }

        public async Task GetPlayerLocation(string playerId)
        {
            Console.WriteLine("GetPlayerLocation Called");

            var player = State.GetPlayerById(playerId);

            await Clients.Caller.SendAsync(ClientMethods.PlayerLocation, player.Id, player.Location);
        }

        public void GetPlayers()
        {
            State.Players.ForEach(async (player) =>
            {
                await Clients.Caller.SendAsync(ClientMethods.PlayerLocation, player.Id, player.Location);
            });
        }

        public void UpdatePlayer(Player player)
        {
            var playerToUpdate = State.GetPlayerById(player.Id);
            playerToUpdate.Location = player.Location;
        }

        public void UpdatePlayerLocation(string playerId, string newCoordinate)
        {
            Console.WriteLine("UpdatePlayerLocation Called");

            Coordinates newCoords = JsonConverter.Deserialize<Coordinates>(newCoordinate);
            State.GetPlayerById(playerId).Location = newCoords;
        }
    }
}
