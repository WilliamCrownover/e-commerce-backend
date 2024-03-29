const router = require( 'express' ).Router();
const { Tag, Product } = require( '../../models' );

// The `/api/tags` endpoint

router.get( '/', async ( req, res ) => {
	// find all tags
	// be sure to include its associated Product data
	try {
		const tagsData = await Tag.findAll( {
			include: [
				{
					model: Product,
					through: { attributes: [] }
				}
			]
		} );

		console.log( '\n----- ALL TAGS FOUND -----\n' );
		res.status( 200 ).json( tagsData );

	} catch ( err ) {
		res.status( 500 ).json( err );
	}
} );

router.get( '/:id', async ( req, res ) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
	try {
		const tagData = await Tag.findByPk( req.params.id, {
			include: [
				{
					model: Product,
					through: { attributes: [] }
				}
			]
		} );

		console.log( `\n----- TAG ${tagData.tag_name} FOUND -----\n` );
		res.status( 200 ).json( tagData );

	} catch ( err ) {
		res.status( 404 ).json( err );
	}
} );

router.post( '/', async ( req, res ) => {
	// create a new tag
	try {
		const tag = await Tag.create( req.body );

		console.log( `\n----- TAG ${req.body.tag_name} ADDED -----\n` );
		res.status( 200 ).json( tag );

	} catch ( err ) {
		res.status( 400 ).json( err );
	}
} );

router.put( '/:id', async ( req, res ) => {
	// update a tag's name by its `id` value
	try {
		const updatedTag = await Tag.update( req.body, {
			where: { id: req.params.id, }
		} );

		console.log( `\n----- TAG ${req.body.tag_name} UPDATED -----\n` );
		res.status( 200 ).json( updatedTag );

	} catch ( err ) {
		res.status( 400 ).json( err );
	}
} );

router.delete( '/:id', async ( req, res ) => {
	// delete one tag by its `id` value
	try {
		const deletedTag = await Tag.destroy( {
			where: { id: req.params.id }
		} );

		console.log( `\n----- TAG WITH ID:${req.params.id} DELETED -----\n` );
		res.status( 200 ).json( deletedTag );

	} catch ( err ) {
		res.status( 500 ).json( err );
	}
} );

module.exports = router;