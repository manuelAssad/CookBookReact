import React, { Component } from "react";

class Contact extends Component {
  render() {
    return (
      <div id="contact">
        <div className="row">
          <h2 className="mx-auto mt-3 mt-md-5">Contact</h2>
        </div>

        <div className="container">
          <div className="row border green-border round-border my-lg-5 bg-responsive-color1 responsive-border">
            <div className="col-lg-8 green-border border-right responsive-border py-4">
              <h3 className="col-12 mb-4">Send me a Message</h3>
              <p className="ml-3 mb-lg-5">
                I would love to hear from you! Send me a message and i will
                respond to you as soon as i can!
              </p>
              <hr className="d-block d-lg-none" />
              <div className="col">
                <form>
                  <div className="row form-group">
                    <label for="fullName" className="col-md-2 col-form-label">
                      Full Name
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>

                  <div className="row form-group">
                    <label for="areaCode" className="col-md-2 col-form-label">
                      Contact Tel.
                    </label>
                    <div className="col-5 col-md-3">
                      <input
                        className="form-control"
                        type="tel"
                        id="areaCode"
                        name="areaCode"
                        placeholder="Area code"
                      />
                    </div>
                    <div className="col-7">
                      <input
                        className="form-control"
                        type="tel"
                        name="telNum"
                        placeholder="Tel. number"
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <label for="email col-form-label" className="col-md-2">
                      Email
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                      />
                    </div>
                  </div>

                  <div className="row form-group">
                    <label for="subject" className="col-md-2 col-form-label">
                      Subject
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                      />
                    </div>
                  </div>

                  <div className="row form-group">
                    <label for="message " className="col-form-label col-md-2">
                      Your Message
                    </label>
                    <div className="col-md-10">
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="8"
                      ></textarea>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="offset-md-2 col-md-10">
                      <button className="btn btn-color2 hvr-grow" type="submit">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-3 small-offset py-lg-4">
              <h3>Contact Details</h3>
              <hr />
              <p>
                <a href="https://manuelassad.com" className="contact-link">
                  <i className="fa fa-globe contact-icon hvr-grow"></i>{" "}
                  manuelassad.com
                </a>
              </p>
              <p>
                <a
                  className="link"
                  href="mailto:manuelnasif@gmail.com"
                  className="contact-link"
                >
                  <i className="fa fa-envelope contact-icon hvr-grow"></i>{" "}
                  manuelnasif@gmail.com
                </a>
              </p>
              <p>
                <a
                  className="link"
                  href="tel:+16266024443"
                  className="contact-link"
                >
                  <i className="fa fa-phone contact-icon hvr-grow"></i> (626)
                  602-4443
                </a>
              </p>
              <hr />
              <div className="mt-2 mt-lg-5 col-12 d-flex d-md-block">
                <div className="mx-auto">
                  <a className="link" href="http://fb.com/">
                    <i className="fa fa-facebook-square contact-social-icon hvr-grow"></i>
                  </a>
                  <a className="link" href="http://instagram.com/">
                    <i className="fa fa-instagram contact-social-icon hvr-grow"></i>
                  </a>
                  <a className="link" href="http://twitter.com/">
                    <i className="fa fa-twitter contact-social-icon hvr-grow"></i>
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
