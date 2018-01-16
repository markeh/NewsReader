using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace NewsAPI.Controllers
{
    [Route("api/[controller]")]
    public class NewsController : Controller
    {

        private IConfiguration _configuration;

        public NewsController(IConfiguration Configuration)
        {
            _configuration = Configuration;
        }        

        // GET api/news/region
        [HttpGet("{region}")]
        public string Get(string region)
        {

            var url = _configuration["BaseUrl"] + "top-headlines?" +
                      "country=" + region + "&" +
                      "apiKey=" + _configuration["ApiKey"];

            var json = new WebClient().DownloadString(url);
            return json;
        }

        // GET api/news/searchterm
        [HttpGet("{region}/{term}")]
        public string Get(string region, string term)
        {
            var url = _configuration["BaseUrl"] + "everything?" 
                      + term +"&apiKey=" + _configuration["ApiKey"];

            var json = new WebClient().DownloadString(url);
            return json;
        }
        
    }
}
