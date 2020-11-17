const unhandledExceptionsHandler = asyncFunction => {
  return async (req, res, next) => {
      try {
          await asyncFunction(req, res, next);
      }
      catch (e) {
          next(e);
      }
  }
}

module.exports = unhandledExceptionsHandler;