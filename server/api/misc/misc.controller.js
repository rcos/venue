import {seed} from "../../config/seed";

exports.reseed = (req, res) => {
    seed().then(() => {
        return res.send({success: true});
    }).catch((err) => {
        return res.status(500).send(err);
    });
};
