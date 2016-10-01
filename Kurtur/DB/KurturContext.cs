using Kurtur.DB.Models;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kurtur.DB
{
    public class KurturContext : DbContext
    {
        public KurturContext(DbContextOptions<KurturContext> options) : base(options)
        {

        }

        public DbSet<City> Cities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<City>().HasKey("Id");
            base.OnModelCreating(modelBuilder);
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();
            return base.SaveChanges();
        }
    }
}
