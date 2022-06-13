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
            const ERROR_NOTICE = `An error occurred!:  ${error}`;
            console.error(ERROR_NOTICE);

            const ERROR_STATUS_CODE = 400;

            // if (!req.complete) {
            if (req.xhr) {
                const errorResponseObject = {
                    status: ERROR_STATUS_CODE,
                    message: ERROR_NOTICE,
                };
                console.log('errorResponseObject: ', errorResponseObject);
                res.status(ERROR_STATUS_CODE).json(errorResponseObject);
            }

            res.status(ERROR_STATUS_CODE).send(ERROR_NOTICE);
            // }

            next(error);
        }
        if (req.complete)
            console.log('response sent\n');
    },
};
exports.handleRequestSafely = requestKit.handleRequestSafely;
exports.default = requestKit;
