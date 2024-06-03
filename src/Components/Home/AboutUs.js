import React from "react";
import image1 from "../Image/AboutUs/image1.jpg";
import image2 from "../Image/AboutUs/image2.jpg";
import image3 from "../Image/AboutUs/image3.jpg";

const AboutUs = () => {
  return (
    <div id="aboutUs" className="container">
      <h1>Who We Are</h1>
      <div class="row">
        <div class="col-8">
          <p>
            The Blood Bank Management System is a web application developed by
            fourth-year students of the Institute of Technology and Management,
            Gida, Gorakhpur, as a major project. This system aims to streamline
            the process of managing blood donations, requests, and inventory for
            a blood bank.
          </p>
        </div>

        <div class="col-4">
          <div
            id="carouselExampleFade"
            class="carousel slide carousel-fade"
            data-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src={image1} class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src={image2} class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src={image3} class="d-block w-100" alt="..." />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleFade"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleFade"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
