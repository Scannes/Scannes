const { isAxiosError } = require("axios");

function handleError(err, res) {
  res.status(err.statusCode || 400).json({
    message: err.message || "Something went wrong try again later.",
    status: err.status,
  });
}
function handleAxios(err, res) {
  res.status(err.response.status || 400).json({
    message: "error",
    err,
  });
}
module.exports = function (err, req, res, next) {
  if (isAxiosError(err)) {
    console.log(err);
    return handleAxios(err, res);
  }
  handleError(err, res);
};
