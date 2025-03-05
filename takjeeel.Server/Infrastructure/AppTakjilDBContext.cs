using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using takjeeel.Server.Models;

namespace takjeeel.Server.Infrastructure
{
	public class AppTakjilDBContext : DbContext
	{
		public DbSet<Takjil> Takjils { get; set; }

		public AppTakjilDBContext(DbContextOptions<AppTakjilDBContext> options) : base(options)
		{
		}
	}
}