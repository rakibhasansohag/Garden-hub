const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('🌿 Garden Hub Server is up!'));

const client = new MongoClient(process.env.MONGODBURL, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		// await client.connect();
		// Point: Collections
		const gardenersCollection = client.db('gardenDB').collection('gardeners');
		const tipsCollection = client.db('gardenDB').collection('tips');

		// Send a ping to confirm a successful connection
		// await client.db('admin').command({ ping: 1 });
		// console.log(
		// 	'Pinged your deployment. You successfully connected to MongoDB!',
		// );

		// Point — Gardeners CRUD —
		// Create a gardener
		app.post('/gardeners', async (req, res) => {
			const newGardener = req.body;
			if (!newGardener.uid) {
				return res.status(400).send({ error: 'UID is required' });
			}
			// for duplicated users
			const filter = { uid: newGardener.uid };
			const update = { $set: newGardener };
			const options = { upsert: true };

			const result = await gardenersCollection.updateOne(
				filter,
				update,
				options,
			);
			return res.send(result);
		});

		// Read all gardeners
		app.get('/gardeners', async (req, res) => {
			const { status, limit } = req.query;
			let query = {};
			if (status) {
				query.status = status;
			}
			let cursor = gardenersCollection.find(query);
			if (limit) {
				cursor = cursor.limit(parseInt(limit));
			}
			const result = await cursor.toArray();
			res.send(result);
		});

		// Read single gardener
		app.get('/gardeners/:uid', async (req, res) => {
			try {
				const uid = req.params.uid;
				const gardener = await gardenersCollection.findOne({ uid: uid });

				if (!gardener) {
					return res.status(404).send({ error: 'Gardener not found' });
				}
				res.send(gardener);
			} catch (error) {
				console.error('Error fetching gardener:', error);
				res.status(500).send({ error: 'Internal server error' });
			}
		});

		// Update a gardener
		app.put('/gardeners/:uid', async (req, res) => {
			try {
				const uid = req.params.uid;
				const updated = req.body;
				const result = await gardenersCollection.updateOne(
					{ uid },
					{ $set: updated },
					{ upsert: false },
				);
				res.send(result);
			} catch (error) {
				console.error('Error updating gardener:', error);
				res.status(500).send({ error: 'Internal server error' });
			}
		});

		// Delete a gardener
		app.delete('/gardeners/:id', async (req, res) => {
			const id = req.params.id;
			const result = await gardenersCollection.deleteOne({
				_id: new ObjectId(id),
			});
			res.send(result);
		});

		// Point — TIPS CRUD —
		app.post('/tips', async (req, res) => {
			const newTip = req.body;
			newTip.userId = newTip.userId || null;
			newTip.likedBy = [];
			newTip.createdAt = new Date();
			const result = await tipsCollection.insertOne(newTip);
			res.send(result);
		});

		// Get all the public tips
		app.get('/tips', async (req, res) => {
			const { category, difficulty, limit } = req.query;
			const query = { availability: 'Public' };

			if (category) query.category = category;
			if (difficulty) query.difficulty = difficulty;

			const options = {
				sort: { createdAt: -1 },
				limit: parseInt(limit) || 20,
			};

			const result = await tipsCollection.find(query, options).toArray();
			res.send(result);
		});

		// Get a single tip
		app.get('/tips/:id', async (req, res) => {
			const id = req.params.id;

			if (!ObjectId.isValid(id)) {
				return res.status(400).json({ error: 'Invalid tip ID format' });
			}

			try {
				const query = { _id: new ObjectId(id) };
				const tip = await tipsCollection.findOne(query);

				if (!tip) {
					return res.status(404).json({ message: 'Tip not found' });
				}

				res.send(tip);
			} catch (error) {
				console.error('Error fetching tip:', error);
				res.status(500).send('Internal Server Error');
			}
		});

		// Like a tip (only once per user)
		app.patch('/tips/:id/like', async (req, res) => {
			const userId = req.body.userId;
			const tip = await tipsCollection.findOne({
				_id: new ObjectId(req.params.id),
			});

			if (tip.likedBy.includes(userId)) {
				return res
					.status(400)
					.send({ message: 'You have already liked this tip' });
			}

			const result = await tipsCollection.updateOne(
				{ _id: new ObjectId(req.params.id) },
				{ $inc: { totalLiked: 1 }, $push: { likedBy: userId } },
			);
			res.send(result);
		});

		// Get all tips created by a user
		app.get('/gardeners/:userId/tips', async (req, res) => {
			const userId = req.params.userId;
			const tips = await tipsCollection
				.find({ userId })
				.sort({ createdAt: -1 })
				.toArray();
			res.json(tips);
		});

		// Update a tip (only by the owner)
		app.put('/tips/:id', async (req, res) => {
			const tipId = new ObjectId(req.params.id);
			const data = { ...req.body };
			delete data._id;

			const userId = data.userId;
			data.updatedAt = new Date();
			data.updatedBy = { uid: userId, name: data.userName };

			const result = await tipsCollection.updateOne(
				{ _id: tipId, userId },
				{ $set: data },
				{ upsert: false },
			);
			res.send(result);
		});

		// Delete a tip (only by the owner)
		app.delete('/tips/:id', async (req, res) => {
			const tipId = new ObjectId(req.params.id);
			const userId = req.query.userId;
			const result = await tipsCollection.deleteOne({ _id: tipId, userId });
			res.send(result);
		});

		// random 3 tip
		app.get('/tips/random', async (req, res) => {
			const limit = parseInt(req.query.limit) || 3;
			const result = await tipsCollection
				.aggregate([
					{ $match: { availability: 'Public' } },
					{ $sample: { size: limit } },
				])
				.toArray();
			res.send(result);
		});
	} catch (error) {
		console.log(`error connecting to mongoDB ${error}`);
	} finally {
		//  await client.close();
	}
}
run().catch(console.dir);

app.listen(port, () => {
	console.log(`Garden Hub server is running on port: ${port}`);
});
