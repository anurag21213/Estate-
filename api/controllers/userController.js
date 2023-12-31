const Listing = require("../models/listing.model")
const UserModel = require("../models/user.model")
const errorHandler = require("../utils/errorHandler")
const bcrypt = require('bcrypt')
const updateUserConroller = async (req, res, next) => {
    if (req.user.id != req.params.id) return next(errorHandler(401, 'Unauthorized'))

    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }

        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true })

        const { password, ...rest } = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

const deleteUserController = async (req, res, next) => {
    if (req.user.id != req.params.id) return next(errorHandler(401, 'You are not authorized to delete!!'))
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token')
        res.status(200).json({ message: 'user has been deleted' })
    } catch (error) {
        next(error)
    }
}

const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ userRefs: req.params.id })
            res.status(200).json(listings)
        } catch (error) {
            next(error)
        }
    }
    else {
        next(errorHandler(401, 'You can view only your listings'))
    }

}

const getUser = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (!user) {
            return next(errorHandler(404, 'user not found'))
        }
        const { password: pass, ...rest } = user._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}
module.exports = { updateUserConroller, deleteUserController, getUserListings, getUser }