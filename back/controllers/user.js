const _=require('lodash');
const User = require('../models/user');

exports.userById = (req, res, next, id) => {
    User.findById(id)
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "Cet utilisateur n'exite pas"
            });
        }
    req.profile = user                  // Ajoute un objet profile dans la requete avec les infos de l'user
    next();
    });
};

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id
    if(!authorized){
        return res.status(403).json({
            error: "L'utilisateur n'est pas autoriser à effectuer cette action."
        });
    }
}

exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json(users);
    }).select("name email updated created");
}

exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile);
}

exports.updateUser = (req, res, next) => {
    let user = req.profile;
    user = _.extend(user, req.body)   //extend - mutate l'objet source
    user.updated = Date.now()
    user. save((err) => {
        if(err) {
            return res.status(400).json({
                error: "Vous n'êtes pas autorisé à effectuer cette action."
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({user})
    });

}

exports.deleteUser = (req, res) => {
    let user = req.profile;
    user.remove((err, user) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: "L'utilisateur à été supprimé avec succès"
        })
    })
}

//Follows

exports.addFollowing = (req, res, next) => {
    User.findByIdAndUpdate(req.body.userId, { $push: { following: req.body.followId } }, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        next();
    });
};

exports.addFollower = (req, res) => {
    User.findByIdAndUpdate(req.body.followId, { $push: { followers: req.body.userId } }, { new: true })
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};

//remove follow

exports.removeFollowing = (req, res, next) => {
    User.findByIdAndUpdate(req.body.userId, { $pull: { following: req.body.unfollowId } }, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        next();
    });
};

exports.removeFollower = (req, res) => {
    User.findByIdAndUpdate(req.body.unfollowId, { $pull: { followers: req.body.userId } }, { new: true })
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};
