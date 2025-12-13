import Review from "../models/review.model.js";

export const createReview = async (req, res) => {
  try {
    const { rating, comment, company } = req.body;

    const review = await Review.create({
      user: req.user._id,
      company,
      rating,
      comment
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCompanyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ company: req.params.id })
      .populate("user", "name avatar");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
