"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequestSafely = void 0;
const requestKit = {
    routes: {},
    addRouteToRoutes(req) {
        const url = req.url;
        const method = req.method.toUpperCase();
        if (!this.routes[url]) {
            this.routes[url] = {
                method,
            };
        }
    },
    async handleRequestSafely(req, res, next, requestCallback) {
        this.addRouteToRoutes(req);
        try {
            await requestCallback();
        }
        catch (error) {
            const ERROR_NOTICE = `Oops, an error occurred on the server!:  ${error}`;
            console.error(ERROR_NOTICE);
            if (req.xhr) {
                res.status(500).json({
                    status: 500,
                    message: ERROR_NOTICE,
                    error,
                });
            }
            res.status(500).send(ERROR_NOTICE);
            next(error);
        }
        if (req.complete)
            console.log('response sent\n');
    },
};
exports.handleRequestSafely = requestKit.handleRequestSafely;
exports.default = requestKit;
