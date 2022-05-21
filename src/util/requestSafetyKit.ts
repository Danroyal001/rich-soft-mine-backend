import { NextFunction, Request, Response } from "express";

const requestSafetyKit = {

    handleRequestSafely(req: Request, res: Response, next: NextFunction, requestCallback: Function) {
        try {
            requestCallback();
        } catch (error) {
            console.error(error);
            const ERROR_NOTICE = 'Oops, an error occurred on the server!';

            if (req.xhr) res.status(500).json({
                status: 500,
                message: ERROR_NOTICE,
                error,
            })

            res.status(500).send(ERROR_NOTICE);

            next(error);
        }
    },

};

export default requestSafetyKit;
