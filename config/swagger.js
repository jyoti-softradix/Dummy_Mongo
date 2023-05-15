require('dotenv').config()
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    opneapi: "3.0.0",
    info: {
      description: "Demo_project Api's.",
      title: "Dummy Project",
      version: "1.0.0",
    },
    host: process.env.API_BASE_URL,
  },
  apis: [],
};



const swaggerSpec = swaggerJsdoc(options);

swaggerSpec.paths = {
  "/auth/signup": {
    post: {
      tags: ["auth"],
      summary: "Login Api",
      parameters: [
        {
          name: "body",
          in: "body",
          required: true,
          type: "object",
          schema: {
            properties: {
              first_name: {
                type: "string",
                default: "",
              },
              last_name: {
                type: "string",
                default: "",
              },
              phone_number: {
                type: "string",
                default: "",
              },
              email: {
                type: "string",
                default: "",
              },
              password: {
                type: "string",
                default: "",
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: "ok",
        },
      },
      security: [
        {
          authorization: [],
        },
      ],
    },
  },
  "/login": {
    post: {
      tags: ["auth"],
      summary: "Login Api",
      parameters: [
        {
          name: "body",
          in: "body",
          required: true,
          type: "object",
          schema: {
            properties: {
              email: {
                type: "string",
                default: "",
              },
              password: {
                type: "string",
                default: "",
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: "ok",
        },
      },
    },
  },
  "/user/delete/{id}": {
    delete: {
      tags: ["user"],
      summary: "APi for delete user",
      parameters: [
        {
          name: "id",
          in: "path",
          type: "string",
          required: true,
        },
      ],
      responses: {
        200: {
          description: "ok",
        },
      },
      security: [
        {
          authorization: [],
        },
      ],
    },
  },
  "/user/edit/{id}": {
    put: {
      tags: ["user"],
      summary: "APi for edit user's profile",
      parameters: [
        {
          name: "id",
          in: "path",
          type: "string",
          required: true,
        },
        {
          name: "body",
          in: "body",
          required: true,
          type: "object",
          schema: {
            properties: {
              first_name: {
                type: "string",
                default: "",
              },
              last_name: {
                type: "string",
                default: "",
              },
              phone_number: {
                type: "string",
                default: "",
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: "ok",
        },
      },
      security: [
        {
          authorization: [],
        },
      ],
    },
  },
  // "/auth/forgot-password": {
  //   post: {
  //     tags: ["auth"],
  //     summary: "APi for forgot password",
  //     parameters: [
  //       {
  //         name: "body",
  //         in: "body",
  //         required: true,
  //         type: "object",
  //         schema: {
  //           properties: {
  //             email: {
  //               type: "string",
  //             },
  //           },
  //         },
  //       },
  //     ],
  //     responses: {
  //       200: {
  //         description: "ok",
  //       },
  //     },
  //   },
  // },
  // "/auth/reset-password": {
  //   post: {
  //     tags: ["auth"],
  //     summary: "APi for reset password",
  //     parameters: [
  //       {
  //         name: "body",
  //         in: "body",
  //         required: true,
  //         type: "object",
  //         schema: {
  //           properties: {
  //             token: {
  //               type: "string",
  //             },
  //             password: {
  //               type: "string",
  //             },
  //           },
  //         },
  //       },
  //     ],
  //     responses: {
  //       200: {
  //         description: "ok",
  //       },
  //     },
  //   },
  // },
  // "/auth/change-password": {
  //   post: {
  //     tags: ["auth"],
  //     summary: "APi for change password",
  //     parameters: [
  //       {
  //         name: "body",
  //         in: "body",
  //         required: true,
  //         type: "object",
  //         schema: {
  //           properties: {
  //             old_password: {
  //               type: "string",
  //             },
  //             new_password: {
  //               type: "string",
  //             },
  //           },
  //         },
  //       },
  //     ],
  //     responses: {
  //       200: {
  //         description: "ok",
  //       },
  //     },
  //     security: [
  //       {
  //         authorization: [],
  //       },
  //     ],
  //   },
  // },
 
};

swaggerSpec.securityDefinitions = {
  authorization: {
    type: "apiKey",
    name: "authorization",
    in: "header",
  },
};

module.exports = swaggerSpec;
