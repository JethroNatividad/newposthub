import formidable from 'formidable'

export default async function parseForm(req, res, next) {
    const form = formidable({ multiples: true })

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).end(err.message)
        }
        req.body = fields
        req.files = files
        return next()
    })

}