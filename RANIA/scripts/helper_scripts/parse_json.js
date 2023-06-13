function parse_json(jsonString) {
    try {
      const parsedJson = JSON.parse(jsonString);
      return parsedJson;
    } catch (err) {
      // Handle the error or throw it again to propagate
      console.error('Error parsing JSON:', err);
      return 10
    }
  }

module.exports = parse_json