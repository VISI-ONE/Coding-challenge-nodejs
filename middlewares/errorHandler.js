const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else if (err.name === "ValidationError") {
    res.status(400).json({ error: "Validation Error", details: err.errors });
  } else {
    console.error("Unexpected Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = { errorHandler, CustomError };
