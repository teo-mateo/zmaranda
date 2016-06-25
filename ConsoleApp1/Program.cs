using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("Habracadavra");

            IEnumerable<Item> items = new Item[]
            {
                new Item { Id = 31, Name="System.Linq" },
                new Item { Id = 21, Name="System;" },
                new Item { Id = 32, Name="System.Collections.Generic" },
                new Item { Id = 14, Name="namespace ConsoleApp1" },
                new Item { Id = 5, Name="System.Threading.Tasks" }
            };

            foreach(var i in items.OrderBy(i=>i.Id))
            {
                Console.WriteLine(i.Name);
            }

            Console.ReadKey();
        }
    }

    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

}
