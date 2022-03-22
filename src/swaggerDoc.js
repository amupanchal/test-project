
// User Schema
/**
 * @swagger
 *  components:
 *    schemas:
 *     User:
 *       type: object
 *       properties:
 *          blockchainAddress:
 *              type: string
 *          email:
 *              type: string
 *          role:
 *              type: string
 */


// Property Schema
/**
 * @swagger
 *  components:
 *    schemas:
 *     Property:
 *       type: object
 *       properties:
 *         _id:
 *          type: string
 *         propertyName:
 *          type: string
 *          propertyId:
 *            type: string
 *          noOfTokens:
 *            type: integer
 *          linkToProperty:
 *           type: string
 *         propertyIdServiceProvider:
 *           type: string
 *         companyManagingTheProperty:
 *           type: string
 *         propertyInfo:
 *           type: string
 *         pacasoName:
 *           type: string
 *         photoUrl:
 *           type: string
 *         houseNumber:
 *           type: string
 *         street1:
 *           type: string
 *         street2:
 *           type: string
 *         city:
 *           type: string'
 *         state:
 *           type: string
 *         county:
 *           type: string
 *         zip:
 *           type: integer
 *         pacasoMarket:
 *           type: string
 *         area:
 *           type: string
 *         beds:
 *           type: integer
 *         parcelNumber:
 *           type: string
 *         baths:
 *           type: integer
 *         lastTokenPrice:
 *           type: string

 */

// Token Shcema
/**
 * @swagger
 * components:
 *   schemas:
 *     Token:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         propertyId:
 *           type: string
 *         tokenId:
 *           type: string
 *         propertyIdServiceProvider:
 *           type: string
 *         propertyInfo:
 *           type: string
 *         ownershipPercentage:
 *           type: string
 *         linkToProperty:
 *           type: string
 *         pacasoName:
 *           type: string
 *         blockchainAddress:
 *           type: string
 *         ownerId:
 *           type: string
 *         identityServiceProvider:
 *           type: string
 *         purchaseDate:
 *           type: date
 *         purchasePrice:
 *           type: string
 *         salePrice:
 *           type: string
 *         loanAmount:
 *           type: string
 *         lender:
 *           type: string
 *         loanIntrestRate:
 *           type: string
 *         loanTerm:
 *           type: string
 *         loanType:
 *           type: string
 *         loanCurrency:
 *           type: string
*/

// User Apis

/**
 * @swagger
 * /api/user/sign-in:
 *  post:
 *      summary: Sign in
 *      description: user can use for sign in to the website
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - blockchaninAddress
 *                      properties:
 *                          blockchaninAddress:
 *                              type: string
 *      responses:
 *          200:
 *              description: Sign in successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                          properties:
 *                              role:
 *                                  type: string
 *                              token:
 *                                  type: string
 *          503:
 *              description: Something is wrong
 *          
 */


/**
 * @swagger
 * /api/user/create:
 *  post:
 *      summary: create user
 *      description: admin can add the users 
 *      security:
 *          - bearerAuth:
 *              in: header
 *              name: Authorization
 *              type: apiKey
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/User'
 *      responses:
 *          200:
 *              description: User is added sucessfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                          properties:
 *                          example:
 *                              message: User is added sucessfully
 * 
 */

/**
 * @swagger
 * /api/user/list:
 *  post:
 *   summary: Get List 
 *   description: admin can get the user list
 *   security:
 *     - bearerAuth:
 *         in: header
 *         name: Authorization
 *         type: apiKey
 *   requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *              size:
 *               type: number
 *              page:
 *               type: number
 *   responses:
 *     200:
 *       description: A successful response
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *                  $ref: '#components/schemas/User'
 */



/**
 * @swagger
 * /api/user/update/{id}:
 *  put:
 *      summary: Update User
 *      description: admin can update the users in mongodb 
 *      security:
 *          - bearerAuth:
 *              in: header
 *              name: Authorization
 *              type: apiKey
 *      parameters:
 *          - in: path
 *            name: id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/User'
 *      responses:
 *          200:
 *              description: User is updated sucessfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref : '#components/schemas/User'
 * 
 */


/**
 * @swagger
 * /api/user/delete/{id}:
 *  delete:
 *      summary : Delete User
 *      description: admin can delete the user from mongodb 
 *      security:
 *          - bearerAuth:
 *              in: header
 *              name: Authorization
 *              type: apiKey
 *      parameters:
 *          - in: path
 *            name: id
 *      responses:
 *          200:
 *              description: User is deleted sucessfully
 * 
 */


/**
 * @swagger
 * /api/property/create:
 *  post:
 *   summary: Create Property
 *   description: admin and property manager can create new property in database
 *   security:
 *     - bearerAuth:
 *         in: header
 *         name: Authorization
 *         type: apiKey
 *   requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#components/schemas/Property'
 *   responses:
 *     200:
 *       description: Property Created Successfully
 */

/**
 * @swagger
 * /api/property/list:
 *  post:
 *   summary: Property list
 *   description: User can get the property list
 *   security:
 *     - bearerAuth:
 *         in: header
 *         name: Authorization
 *         type: apiKey
 *   requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             page:
 *              type: integer
 *             size:
 *              type: integer
 *             sort:
 *              type: object
 *              properties:
 *                beds:
 *                  type: integer
 *                lastTokenPrice:
 *                  type: integer
 *             filters:
 *               type: object
 *               properties:
 *                 state:
 *                   type: string
 *                 city:
 *                   type: string
 *   responses:
 *     200:
 *       description: A successful response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 */

/**
 * @swagger
 * /api/property/{id}:
 *  get:
 *   summary: Get single property
 *   description : user can get the signle proerty details
 *   security:
 *     - bearerAuth:
 *         in: headers
 *         name: Authorization
 *         type: apiKey
 *   parameters:
 *     - in: path
 *       name: id
 *   responses:
 *     '200':
 *       description: A successful response
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *              _id: qwertrewsdc2342e
 *              propertyId: wdwdwd-ac
 *              propertyName: The new turning
 *              noOfTokens: 8
 *              linkToProperty: https://
 *              propertyIdServiceProvider: test
 *              companyManagingTheProperty: test
 *              propertyInfo: jff sfsjfjh f fsjfnjhk
 *              pacasoName: test
 *              photoUrl: https://
 *              houseNumber: '304'
 *              street1: test
 *              street2: test
 *              city: test
 *              state: test
 *              zip: 123456
 *              county: test
 *              pacasoMarket: test
 *              area: test
 *              beds: 2
 *              parcelNumber: test
 *              baths: 2
 *              lastTokenPrice: '$ 2932'
 *              tokens: [{ _id: 13trdgerg, tokenId: wfwegwegweg, blockchainAddress: wjfwehfwehfwehfwfj, purchasePrice: $2232, purchaseDate: '', ownershipPercentage: 12.5%
 *                      }]
 */

/**
 * @swagger
 * /api/property/update/{id}:
 *  put:
 *   summary: Update property
 *   description : Admin and  Property manager can update the property
 *   security:
 *     - bearerAuth:
 *         in: header
 *         name: Authorization
 *         type: apiKey
 *   parameters:
 *      - in: path
 *        name: id
 *   requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Property'
 *   responses:
 *     200:
 *       description: Property Updated Successfully
 */

/**
 * @swagger
 * /api/property/delete/{id}:
 *  delete:
 *   summary: Delete property
 *   description: Admin and Property manager can delete the property
 *   security:
 *     - bearerAuth:
 *         in: headers
 *         name: Authorization
 *         type: apiKey
 *   parameters:
 *     - in: path
 *       name: id
 *   responses:
 *     200:
 *       description: Property Deleted Successfully
 */


/**
 * @swagger
 * /api/token/list:
 *  post:
 *   summary: Token list
 *   description: user can get the list of token
 *   security:
 *     - bearerAuth:
 *         in: header
 *         name: Authorization
 *         type: apiKey
 *   requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             propertyId:
 *              type: string
 *   responses:
 *     200:
 *       description: A successful response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Token'
 */

/**
 * @swagger
 * /api/token/get/{id}:
 *  get:
 *   summary: Get single token
 *   description: user can get the single token deatil information
 *   security:
 *     - bearerAuth:
 *         in: headers
 *         name: Authorization
 *         type: apiKey
 *   parameters:
 *     - in: path
 *       name: id
 *   responses:
 *     200:
 *       description: A successful response
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Token'
 */


/**
 * @swagger
 * /api/token/transfer-token:
 *  put:
 *   summary: Transfer token
 *   description: Owner can transfer token to the another user
 *   security:
 *     - bearerAuth:
 *         in: header
 *         name: Authorization
 *         type: apiKey
 *   requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *              type: string
 *             propertyId:
 *              type: string
 *             tokenId:
 *              type: string
 *             ownershipPercentage:
 *              type: string
 *             newOwnerBlockchainAddress:
 *              type: string
 *             ownerId:
 *              type: string
 *             identityServiceProvider:
 *              type: string
 *             purchasePrice:
 *              type: string
 *             purchaseDate:
 *              type: string
 *             purchaseCurrency:
 *              type: string
 *             loanAmount:
 *              type: string
 *             lender:
 *              type: string
 *             loanIntrestRate:
 *              type: string
 *             loanTerm:
 *              type: string
 *             loanType:
 *              type: string
 *             loanCurrency:
 *              type: string
 *   responses:
 *     200:
 *       description: Token Transferred Successfully
 */

// Transaction schema

/**
  * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       example:
 *         _id: dskdask
 *         identityServiceProvider: 'jsljdls'
 *         fromOwnerId: 'lsdlsdmasl'
 *         toOwnerId: 'jclskclk'
 *         fromOwnerBlockchain: 'aabcskck'
 *         toOwnerBlockchain: 'jsjdlskdjlks'
 *         ownershipPercentage: '12.5%'
 *         tokenId: 'jclskjcl'
 *         purchasePrice: '2000'
 *         purchaseCurrency: 'RS'
 *         purchaseDate: ''
 *         transStatus: Approved
 */


/**
 * @swagger
 * /api/transaction/list:
 *  post:
 *   summary: Transaction list
 *   description: using this api we get transcation list of the user
 *   security:
 *     - bearerAuth:
 *         in: header
 *         name: Authorization
 *         type: apiKey
 *   requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             tokenId:
 *              type: string
 *   responses:
 *     200:
 *       description: A successful response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *     503:
 *       description: Something went wrong
 *     403:
 *       description: Token Expired
 *     401:
 *       description: Unauthorized User
 */


/**
 * @swagger
 * /api/master/list:
 *  post:
 *   summary: location master list 
 *   description: Use to request for get location master list
 *   security:
 *     - bearerAuth:
 *         in: header
 *         name: Authorization
 *         type: apiKey
 *   requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             parent_name:
 *               type: string
 *               description: If you want a parent location list then pass this filter 
 *             parent_id:
 *               type: string
 *               description: If you want a child location list then pass this filter 
 *           example:
 *             parent_name: USA
 *             parent_id: 621cb9b1fb24b688eefd8841
 *   responses:
 *     200:
 *       description: A successful response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              data:
 *               type: array
 *               items:
 *                example:
 *                  _id: 621cb926fb24b688eefd883d
 *                  parent_name: USA
 *                  display_name: Arizona
 *              data1:
 *               type: array
 *               items:
 *                example:
 *                  _id: 621cbcfa929580cbfa317119
 *                  parent_id: 621cb9b1fb24b688eefd8841
 *                  display_name: SAN_DIEGO_CA
 *     503:
 *       description: Something went wrong
 */

