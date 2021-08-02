import React from "react";

const ListReviews = ({ reviews }) => {
  return (
    <>
      <h1 style={{ marginTop: 80 }}>Other Reviews</h1>
      <hr />
      {reviews.map((review) => (
        <>
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(review.rating / 5) * 100}%` }}
            ></div>
          </div>
          <strong
            className="d-block text-secondary"
            style={{ fontSize: 14, marginBottom: 15 }}
          >
            by {review.name}
          </strong>
          <p>{review.comment}</p>
          <hr />
        </>
      ))}
    </>
  );
};

export default ListReviews;
