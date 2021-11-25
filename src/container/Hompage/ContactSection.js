import React, { Component } from "react";

class Contact extends Component {
  render() {
    return (
      <div id="contact">
        <div class="row">
          <h2 class="mx-auto mt-3 mt-md-5">Contact</h2>
        </div>

        <div class="container">
          <div class="row border green-border round-border my-lg-5 bg-responsive-color1 responsive-border">
            <div class="col-lg-8 green-border border-right responsive-border py-4">
              <h3 class="col-12 mb-4">Send me a Message</h3>
              <p class="ml-3 mb-lg-5">
                I would love to hear from you! Send me a message and i will
                respond to you as soon as i can!
              </p>
              <hr class="d-block d-lg-none" />
              <div class="col">
                <form>
                  <div class="row form-group">
                    <label for="fullName" class="col-md-2 col-form-label">
                      Full Name
                    </label>
                    <div class="col-md-10">
                      <input
                        type="text"
                        class="form-control"
                        id="fullName"
                        name="fullName"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>

                  <div class="row form-group">
                    <label for="areaCode" class="col-md-2 col-form-label">
                      Contact Tel.
                    </label>
                    <div class="col-5 col-md-3">
                      <input
                        class="form-control"
                        type="tel"
                        id="areaCode"
                        name="areaCode"
                        placeholder="Area code"
                      />
                    </div>
                    <div class="col-7">
                      <input
                        class="form-control"
                        type="tel"
                        name="telNum"
                        placeholder="Tel. number"
                      />
                    </div>
                  </div>
                  <div class="row form-group">
                    <label for="email col-form-label" class="col-md-2">
                      Email
                    </label>
                    <div class="col-md-10">
                      <input
                        class="form-control"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                      />
                    </div>
                  </div>

                  <div class="row form-group">
                    <label for="subject" class="col-md-2 col-form-label">
                      Subject
                    </label>
                    <div class="col-md-10">
                      <input
                        class="form-control"
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                      />
                    </div>
                  </div>

                  <div class="row form-group">
                    <label for="message " class="col-form-label col-md-2">
                      Your Message
                    </label>
                    <div class="col-md-10">
                      <textarea
                        class="form-control"
                        id="message"
                        name="message"
                        rows="8"
                      ></textarea>
                    </div>
                  </div>
                  <div class="row form-group">
                    <div class="offset-md-2 col-md-10">
                      <button class="btn btn-color2 hvr-grow" type="submit">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-3 small-offset py-lg-4">
              <h3>Contact Details</h3>
              <hr />
              <p>
                <a href="https://manuelassad.com" className="contact-link">
                  <i class="fa fa-globe contact-icon hvr-grow"></i>{" "}
                  manuelassad.com
                </a>
              </p>
              <p>
                <a
                  class="link"
                  href="mailto:manuelnasif@gmail.com"
                  className="contact-link"
                >
                  <i class="fa fa-envelope contact-icon hvr-grow"></i>{" "}
                  manuelnasif@gmail.com
                </a>
              </p>
              <p>
                <a
                  class="link"
                  href="tel:+16266024443"
                  className="contact-link"
                >
                  <i class="fa fa-phone contact-icon hvr-grow"></i> (626)
                  602-4443
                </a>
              </p>
              <hr />
              <div class="mt-2 mt-lg-5 col-12 d-flex d-md-block">
                <div className="mx-auto">
                  <a class="link" href="http://fb.com/">
                    <i class="fa fa-facebook-square contact-social-icon hvr-grow"></i>
                  </a>
                  <a class="link" href="http://instagram.com/">
                    <i class="fa fa-instagram contact-social-icon hvr-grow"></i>
                  </a>
                  <a class="link" href="http://twitter.com/">
                    <i class="fa fa-twitter contact-social-icon hvr-grow"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
