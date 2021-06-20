using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using PryanikiTest.Base;
using PryanikiTest.Models;
using PryanikiTest.Services;

namespace PryanikiTest
{
    sealed class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private IConfiguration Configuration { get; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.Configure<ProductDatabaseSettings>(Configuration.GetSection(nameof(ProductDatabaseSettings)));
            services.AddSingleton<IProductDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<ProductDatabaseSettings>>().Value);
            services.AddScoped<ProductService>();
            services.AddScoped<OrderService>();
        }
        
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}