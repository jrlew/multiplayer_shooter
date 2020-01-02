namespace Shooter.Game
{
    public class Coordinates
    {
        public int X { get; set; }
        public int Y { get; set; }

        public Coordinates() {}

        public Coordinates(int x, int y)
        {
            X = x;
            Y = y;
        }
    }
}