import React from 'react';

const NotFound = () => {
  const token = localStorage.getItem('authTokens')
  return (
    <>
  <meta charSet="UTF-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bootstrap 5 404 page with image</title>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <div className="d-flex align-items-center justify-content-center vh-100">
    <div className="text-center row">
      <div className=" col-md-6">
        <img
          src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
          alt=""
          className="img-fluid"
        />
      </div>
      <div className=" col-md-6 mt-5">
        <p className="fs-3">
          {" "}
          <span className="text-danger">Opps!</span> Page not found.
        </p>
        <p className="lead">The page you're looking for doesn't exist.</p>
        <a href={token ? 'dashboard' : 'home'} className="btn btn-primary">
          Go Home
        </a>
      </div>
    </div>
  </div>
</>


  );
};

export default NotFound;
