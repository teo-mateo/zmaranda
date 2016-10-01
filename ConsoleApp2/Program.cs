using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;

namespace ConsoleApp2
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string pwd = "";
            if (args.Contains("-p"))
            {
                int index = Array.IndexOf(args, "-p");
                if(index > -1)
                    pwd = args[index + 1];
            }

            if(pwd == "")
            {
                Console.WriteLine("No password!");
                return;
            }

            string cs = "User ID=postgres;Password="+pwd+";Host=bardici.ro;Port=15432;Database=postgres;";
            Npgsql.NpgsqlConnection connection = new Npgsql.NpgsqlConnection(cs);
            Npgsql.NpgsqlCommand cmd = new Npgsql.NpgsqlCommand("select * from users", connection);

            connection.Open();

            using (var reader = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection))
            {
                while (reader.Read())
                {
                    Console.WriteLine(reader[0].ToString() + " " + reader[1].ToString());
                }

                reader.Close();
            }

            connection.Close();
            Console.ReadKey();
        }
    }
}
