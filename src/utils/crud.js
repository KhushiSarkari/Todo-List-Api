const getOne = model => async (req, res) => {
    try {
        const doc = await model
            .findOne({ createdBy: req.user._id, _id: req.params.id })
            .lean()
            .exec();
        if (!doc)
            return res.status(400).end();
        return res.status(200).json({ data: doc });
    }
    catch (e) {
        console.error(e);
        return res.status(400).end();
    }

}
const getMany = model => async (req, res) => {
    try {
        const docs = await model
            .find({ createdBy: req.user._id })
            .lean()
            .exec();
        if (!docs)
            return res.status(400).end();
        return res.status(200).json({ data: docs });
    }
    catch (e) {
        console.error(e);
        return res.status(400).end();
    }
}
const createOne = model => async (req, res) => {
    const createdBy = req.user._id;
    try {
        const doc = await model.create({ ...req.body, createdBy });
        return res.status(201).json({ data: doc })
    } catch (e) {
        console.error(e);
        return res.status(400).end();

    }
}
const updateOne = model => async (req, res) => {
    try {
        const doc = await model
            .findOneAndUpdate(
                {
                    createdBy: req.user._id,
                    _id: req.params.id
                },
                req.body,
                { new: true }
            )
            .lean()
            .exec();

        if (!doc)
            return res.status(400).end();

        return res.status(200).json({ data: doc });
    } catch (e) {
        console.error(e);
        return res.status(400).end();
    }

}
const deleteOne = model => async (req, res) => {
    try {
        const doc = model
            .findOneAndRemove(
                {
                    createdBy: req.user._id,
                    _id: req.params.id
                }
            );
        if (!doc)
            return res.status(400).end();
        return res.status(200).json({ data: doc });
    }
    catch (e) {
        console.error(e);
        return res.status(400).end();
    }
}

const crudControllers = model => ({
    getOne: getOne(model),
    getMany: getMany(model),
    createOne: createOne(model),
    updateOne: updateOne(model),
    deleteOne: deleteOne(model)
});

module.exports = crudControllers;