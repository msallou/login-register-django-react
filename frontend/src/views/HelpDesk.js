import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function HelpDesk() {
  return (
    <div>
      <div className="jumbotron text-center bg-primary text-white rounded-3 shadow" style={{ marginTop: '85px', backgroundImage: 'linear-gradient(to right, #007BFF, #00BFFF)', padding: '50px 20px' }}>
        <h1 className="display-4 font-weight-bold">Welcome to the Math Wizard Help Desk</h1>
        <p className="lead">Discover solutions to your math queries with ease!</p>
        <hr className="my-4" style={{ borderColor: 'rgba(255, 255, 255, 0.7)' }} />
        <p>Our team is here to assist you</p>
        <p>If you have any questions or concerns, please email us at: <a className="text-white" href="mailto:mathwizard.HelpDesk@gmail.com">mathwizard.HelpDesk@gmail.com</a></p>
      </div>

    <div className="container mt-5">
      <div className="accordion" id="accordionFlushExample" style={{marginTop: '50px' }}>
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed btn btn-primary rounded"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Question #1
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Placeholder content for this accordion, which is intended to demonstrate
              the <code>.accordion-flush</code> class. This is the first item's
              accordion body.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingTwo">
            <button
              className="accordion-button collapsed btn btn-primary rounded"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Question #2
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Placeholder content for this accordion, which is intended to demonstrate
              the <code>.accordion-flush</code> class. This is the second item's
              accordion body. Let's imagine this being filled with some actual
              content.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingThree">
            <button
              className="accordion-button collapsed btn btn-primary rounded"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              Question #3
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingThree"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Placeholder content for this accordion, which is intended to demonstrate
              the <code>.accordion-flush</code> class. This is the third item's
              accordion body. Nothing more exciting happening here in terms of
              content, but just filling up the space to make it look, at least at
              first glance, a bit more representative of how this would look in a
              real-world application.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingFour">
            <button
              className="accordion-button collapsed btn btn-primary rounded"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFour"
              aria-expanded="false"
              aria-controls="flush-collapseFour"
            >
              Question #4
            </button>
          </h2>
          <div
            id="flush-collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingFour"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Placeholder content for this accordion, which is intended to demonstrate
              the <code>.accordion-flush</code> class. This is the third item's
              accordion body. Nothing more exciting happening here in terms of
              content, but just filling up the space to make it look, at least at
              first glance, a bit more representative of how this would look in a
              real-world application.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingFive">
            <button
              className="accordion-button collapsed btn btn-primary rounded"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFive"
              aria-expanded="false"
              aria-controls="flush-collapseFive"
            >
              Question #5
            </button>
          </h2>
          <div
            id="flush-collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingFive"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Placeholder content for this accordion, which is intended to demonstrate
              the <code>.accordion-flush</code> class. This is the third item's
              accordion body. Nothing more exciting happening here in terms of
              content, but just filling up the space to make it look, at least at
              first glance, a bit more representative of how this would look in a
              real-world application.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingSix">
            <button
              className="accordion-button collapsed btn btn-primary rounded"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseSix"
              aria-expanded="false"
              aria-controls="flush-collapseSix"
            >
              Question #6
            </button>
          </h2>
          <div
            id="flush-collapseSix"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingSix"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Placeholder content for this accordion, which is intended to demonstrate
              the <code>.accordion-flush</code> class. This is the third item's
              accordion body. Nothing more exciting happening here in terms of
              content, but just filling up the space to make it look, at least at
              first glance, a bit more representative of how this would look in a
              real-world application.
            </div>
          </div>
        </div>
        
      </div>
    </div>
    </div>
  );
}

export default HelpDesk;
