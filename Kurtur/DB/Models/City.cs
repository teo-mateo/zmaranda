using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kurtur.DB.Models
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Lat { get; set; }
        public decimal Long { get; set; }
    }
}
