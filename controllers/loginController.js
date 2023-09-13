// Controlador del login

const controller = {
    login: (req, res) => {
      res.render("login");
    },
    loadLogin:(req,res) =>{
      let save_Login = req.body
      res.redirect("/products")
    } 
  };
  
  module.exports = controller