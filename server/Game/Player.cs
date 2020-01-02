using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shooter.Game
{
    public class Player
    {
        public Guid Id;
        public Coordinates Location;

        public Player()
        {
            Id = Guid.NewGuid();
            Location = new Coordinates(0, 0);
        }

        public void UpdateLocation(Coordinates newLocation)
        {
            this.Location = newLocation;
        }
    }
}
