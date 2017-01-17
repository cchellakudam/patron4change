import models, { sequelize } from '../model';
import { extractProps } from '../utils/modelUtils';

const CHANGEMAKER_LIMIT_LANDING_PAGE = 5;

function mapToResultModel(changemaker) {
	if (!changemaker) {
		return null;
	}
	return Object.assign(changemaker, {
		name: `${changemaker.user.firstName} ${changemaker.user.lastName}`
	});
}

function prepareDTO(rawCm) {
	return Object.assign({}, rawCm, {
		user: extractProps(rawCm, 'user'),
		mission: extractProps(rawCm, 'mission')
	});
}

/**
* data access for changemakers
* queries related content of the user and flattens it into the result object
*/
export default class {

	static getAll() {
		return models.changemaker.findAll();
	}

	static getById(id) {
		if ('number' !== typeof id) {
			throw new Error('changemaker id must be a number');
		}
		const cm = models.changemaker.find({
			where: { id: id },
			include: [
				{model: models.user, as:'user'},
				{model: models.content, as: 'mission'},
				{model: models.statusUpdate, as: 'statusUpdates', include: [
					{model: models.content, as: 'content'}
				]}
			],
			order: [
				[{model: models.statusUpdate, as: 'statusUpdates'}, 'createdAt', 'DESC']
			],
			raw: true
		});
		const lastUpdate = sequelize.query(`
			SELECT max("statusUpdates"."createdAt") FROM "statusUpdates" WHERE "statusUpdates"."fkChangemakerId" = ?;`,
			{ replacements: [id], type: sequelize.QueryTypes.SELECT });
		return Promise.all([cm, lastUpdate]).then(([c, l]) => {
			const basis = Object.assign({
				lastStatusUpdate: l[0].max
			}, prepareDTO(c));
			return mapToResultModel(basis);
		});
	}

	static getFeatured() {

		// TODO use sequelize to sort by computed property

		return sequelize.query(`
			SELECT "changemaker"."id", "changemaker"."isApproved", "changemaker"."videoUrl", "changemaker"."createdAt",
				"changemaker"."updatedAt", "changemaker"."fkUserId", "changemaker"."fkContentId", "user"."id" AS "user.id",
				"user"."firstName" AS "user.firstName", "user"."lastName" AS "user.lastName", "user"."email" AS "user.email",
				"user"."isEmailConfirmed" AS "user.isEmailConfirmed", "user"."isAnonymous" AS "user.isAnonymous",
				"user"."isBlocked" AS "user.isBlocked", "user"."pwhash" AS "user.pwhash", "user"."avatarUrl" AS "user.avatarUrl",
				"user"."birthday" AS "user.birthday", "user"."nationality" AS "user.nationality", "user"."countryOfResidence"
				AS "user.countryOfResidence", "user"."createdAt" AS "user.createdAt", "user"."updatedAt" AS "user.updatedAt",
				"mission"."id" AS "mission.id", "mission"."text" AS "mission.text", "mission"."createdAt" AS "mission.createdAt",
				"mission"."updatedAt" AS "mission.updatedAt", max(s."createdAt") as "lastStatusUpdate"
			FROM "changemakers" AS "changemaker"
			JOIN "users" AS "user" ON "changemaker"."fkUserId" = "user"."id"
			LEFT OUTER JOIN "contents" AS "mission" ON "changemaker"."fkContentId" = "mission"."id"
			LEFT OUTER JOIN "statusUpdates" AS s on "changemaker"."id" = s."fkChangemakerId"
			GROUP BY "changemaker"."id", "user"."id", "mission"."id"
			ORDER BY MAX(s."createdAt") DESC
			LIMIT ${CHANGEMAKER_LIMIT_LANDING_PAGE};`, { type: sequelize.QueryTypes.SELECT })
			.then(cms => cms.map(prepareDTO).map(mapToResultModel));
	}

}
