export function validate(schema, source = "body") {
  return (req, res, next) => {
    try {
      const dataToValidate = source === "query" ? req.query : req.body;
      const parsed = schema.parse(dataToValidate);
      if (source === "query") {
        req.query = parsed;
      } else {
        req.body = parsed;
      }
      next();
    } catch (err) {
      if (err.errors) {
        return res.status(422).json({
          error: {
            code: "VALIDATION_FAILED",
            message: "Request validation failed",
            details: err.errors.map((e) => ({
              field: e.path.join("."),
              message: e.message,
            })),
          },
        });
      }
      next(err);
    }
  };
}
