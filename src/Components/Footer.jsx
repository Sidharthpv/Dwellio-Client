import React from 'react'
import { Box, Typography, Grid, Link } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

function Footer() {
  return (
    <>
      <footer class=" text-center text-lg-start mt-5" style={{backgroundColor:'var(--Palette-3)'}}>
  <div class="container p-4">
    <div class="row">
       {/* Company Info  */}
      <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
        <h5 class="text-uppercase">Dwellio</h5>
        <p>
          Find your perfect rental home effortlessly with Dwellio. Your dream home is just a click away!
        </p>
      </div>

       {/* Quick Links */}
      {/* <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
        <h5 class="text-uppercase">Quick Links</h5>
        <ul class="list-unstyled">
          <li><a href="/about" class="text-dark">About Us</a></li>
          <li><a href="/listings" class="text-dark">Browse Listings</a></li>
          <li><a href="/faq" class="text-dark">FAQs</a></li>
          <li><a href="/contact" class="text-dark">Contact Us</a></li>
        </ul>
      </div> */}

       {/* Social Media & Contact */}
      <div class="col-lg-4 col-md-12 mb-4 mb-md-0 ms-auto">
        <h5 class="text-uppercase">Connect With Us</h5>
        <a href="https://facebook.com" target="_blank" class="me-3 text-dark">
          <i class="fab fa-facebook"></i>
        </a>
        <a href="https://twitter.com" target="_blank" class="me-3 text-dark">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" class="me-3 text-dark">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" class="me-3 text-dark">
          <i class="fab fa-linkedin"></i>
        </a>
        <p class="mt-3">Email: support@Dwellio.com</p>
        <p>Phone: +1 (123) 456-7890</p>
      </div>
    </div>
  </div>

   {/* Copyright Section */}
  <div class="text-center p-3 bg-dark text-white">
    © <span id="year"></span> Dwellio. All rights reserved.
  </div>
</footer>

    </>
  )
}

export default Footer
