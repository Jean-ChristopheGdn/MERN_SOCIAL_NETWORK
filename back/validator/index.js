exports.createPostValidator = (req, res, next) => {
    //title
    req.check('title', "Vous devez ajouter un titre").notEmpty()
    req.check('title', "Le titre doit contenir entre 2 et 30 caractères").isLength({
        min : 2,
        max: 30
    });
    //body
    req.check('body', "Le message ne peut pas être vide").notEmpty()
    req.check('body', "Le message doit contenir entre 2 et 140 caractères").isLength({
        min : 2,
        max: 140
    });

    // Check les erreurs
    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();

};

exports.userSignupValidator = (req, res, next) => {
    req.check("name", "Vous devez entre un nom").notEmpty();
    req.check("email", "L'Email doit contenir entre 3 et 40 caractères")
    .matches(/.+\@.+\..+/)
    .withMessage("L'adresse mail n'est pas valide.")
    .isLength({
        min: 3,
        max: 40
    });
    req.check("password", "Vous devez entrer un mot de passe").notEmpty();
    req.check("password")
    .isLength({ 
        min: 6,
        max: 20 
    })
    .withMessage("Le mot de passe doit contenir entre 6 et 20 caractères")
    .matches(/\d/)
    .withMessage("Le mot de passe doit contenir au moins 1 chiffre");

    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }

    next();

};

