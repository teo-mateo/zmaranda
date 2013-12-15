using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace asyncstuff
{
    class TryAsyncAwait1
    {
        static void Main(string[] args)
        {
            WriteTimed("[Main] before call");
            Console.WriteLine();
            var length = GetTheLength();
            WriteTimed("[Main] control was returned to the caller.");
            WriteTimed("[Main] doing stuff in the caller method.");
            WriteTimed("[Main] we count to ten to pass time:");
            for (int i = 0; i < 10; i++) 
            { 
                WriteTimed("[Main] " + i.ToString()); 
            }

            WriteTimed("[Main] arbitrary result from the callee: " + length.Result.ToString());
            Console.ReadLine();
        }



        static async Task<int> GetTheLength()
        {
            HttpClient cli = new HttpClient();
            var start = DateTime.Now;
            WriteTimed("[ASYNC] the network call now.");
            WriteTimed("[ASYNC] awaiting.");
            Console.WriteLine();
            var s = await cli.GetStringAsync("http://techcrunch.com");
            Console.WriteLine();
            WriteTimed("[ASYNC] past awaiting, now the long duration job is finished.");
            var end = DateTime.Now;
            var time = end - start;
            WriteTimed("[ASYNC] network request took " + time.TotalMilliseconds.ToString() + " milliseconds");
            return s.Length;
        }

        static void WriteTimed(string s)
        {
            Console.WriteLine(String.Format("{0:hh:mm:ss:fff} {1}", DateTime.Now, s));
        }
    }
}
