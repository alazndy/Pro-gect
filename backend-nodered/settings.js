
module.exports = {
    uiPort: process.env.PORT || 1880,
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "$2b$08$UKKeoYYoFByY.atyrNNcb.EdqcSVhKknsKUpXAPfYy4tJJaE9w.C6",
            permissions: "*"
        }]
    },
    httpAdminCors: {
        origin: "*",
        methods: "GET,PUT,POST,DELETE"
    },
    httpNodeCors: {
        origin: "*",
        methods: "GET,PUT,POST,DELETE"
    }
}
