module.exports = () => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.log("Error Running");
      console.log("Error", err);
    });
  };
};
