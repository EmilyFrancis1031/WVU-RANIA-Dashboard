function generate_code(length){
    var auth_code = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      auth_code += characters.charAt(randomIndex);
    }
    return auth_code
}

module.exports = generate_code