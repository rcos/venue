import {seed} from "../../config/seed";

exports.reseed = (req, res) => {
    seed().then(() => {
        res.send({success: true});
    }).catch((err) => {
        res.status(500).send(err);
    });
};
