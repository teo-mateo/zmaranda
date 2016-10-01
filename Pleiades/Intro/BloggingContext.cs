using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Pleiades.Intro
{
    public class BloggingContext : DbContext
    {
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Post> Posts { get; set; }
    }

    [Table("blogs")]
    public class Blog
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BlogId { get; set; }
        public string Url { get; set; }
        public List<Post> Posts { get; set; }
    }

    [Table("posts")]
    public class Post
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PostId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        public int BlogId { get; set; }
        public Blog Blog { get; set; }

    }

}
