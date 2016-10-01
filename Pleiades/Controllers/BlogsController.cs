using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Pleiades.Intro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pleiades.Controllers
{
    [Route("api/[controller]")]
    public class BlogsController : Controller
    {
        private BloggingContext _context;

        public BlogsController(BloggingContext context)
        {
            _context = context;
        }

        [HttpGet]
        public string Get(int id)
        {
            return "blogs here";
        }

        [HttpGet("add/{posts}")]
        public string Add(int posts)
        {
            Blog blog = new Blog()
            {
                Url = "http://google.com",
                Posts = new List<Intro.Post>()
            };

            for (int i = 0; i < posts; i++)
            {
                blog.Posts.Add(new Post()
                {
                    Blog = blog,
                    Content = "Post " + i.ToString() + " content.",
                    Title = "Post " + i.ToString() + " title."
                });
            }

            _context.Blogs.Add(blog);
            _context.SaveChanges();



            //_context.SaveChanges();
            return "aa";

        }
    }
}
