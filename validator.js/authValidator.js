const Joi = require('joi');

exports.validateOtpRequest = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required()
    });
    return schema.validate(data);
};
