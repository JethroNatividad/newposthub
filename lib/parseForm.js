import formidable from 'formidable'

export default async function parseForm(req, res, next) {
    console.log("HERE in parseForm")
    const form = formidable({ multiples: true })
    console.log("HERE in parseForm 1")

    form.parse(req, (err, fields, files) => {
        console.log("HERE in parseForm 2")

        if (err) {
            return res.status(500).end(err.message)
        }
        req.body = fields
        req.files = files
        return next()
    })

}