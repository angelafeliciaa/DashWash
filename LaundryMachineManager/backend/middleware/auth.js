const sqlInjectionMiddleware = (req, res, next) => {
  const sussyBaka = [
    /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bUNION\b|\bEXEC\b|\bMERGE\b)/i, // SQL commands
    /\bCHAR\b\(\d+\)/i, // Character conversion
    /(\d+=\d+)/, // Equality checks
  ];

  const isInjection = (input) =>
    sussyBaka.some((pattern) => pattern.test(input));

  const requestData = {
    query: JSON.stringify(req.query),
    body: JSON.stringify(req.body),
    headers: JSON.stringify(req.headers),
  };

  for (const [key, value] of Object.entries(requestData)) {
    if (value && isInjection(value)) {
      console.warn(`Potential SQL Injection detected in ${key}: ${value}`);
      return res
        .status(400)
        .json({
          error: "SQL Injection attempt detected! IP ADDRESS RETRIEVED",
        });
    }
  }

  next();
};

module.exports = { sqlInjectionMiddleware };
