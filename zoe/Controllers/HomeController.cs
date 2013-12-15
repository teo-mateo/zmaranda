﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using zoe.Models;

namespace zoe.Controllers
{
    public class HomeController : Controller
    {
        Product myProduct = new Product
        {
            ProductId = 1,
            Name = "Kayak",
            Description = "A boat for one person",
            Category = "Watersports",
            Price = 275M
        };

        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View(myProduct);
        }

    }
}
