import users from '../../mock/users.json';
import changemakers from '../../mock/changemakers.json';
import backings from '../../mock/backings.json';
module.exports = {

	getAllUsers(){
		return Promise.resolve(users);
	},

	getUserForEmail(email){
		return Promise.resolve(users.filter(user => user.email === email));
	},

	getUserForId(id){
		return Promise.resolve(users.filter(user => user.id === id));
	},

	getAllChangemakers(){
		const changemakerlist = [];
		changemakers.forEach((value) => {
			const usr = users.filter((obj) => {
				return obj.id === value.id;
			});
			changemakerlist.push(usr);
		});
		return Promise.resolve(changemakerlist);
	},

	getFeaturedChangemakers(){
		const rawChangemakers = [];
		changemakers.forEach((value) => {
			const bck = backings.filter((obj) => {
				return obj.changemakerId === value.changemaker_user;
			});
			value.nbBackings = bck.length;
			rawChangemakers.push(value);
		});
	
		const changemakerlist = [];
		rawChangemakers.forEach((value) => {
			const usr = users.filter((obj) => {
				return obj.id === value.changemaker_user;
			});
			usr[0].mission = value.mission;
			usr[0].nbBackings = value.nbBackings;
			changemakerlist.push(usr[0]);
		});

		changemakerlist.sort(function(a,b) {
					return a.nbBackings-b.nbBackings
		});
		return Promise.resolve(changemakerlist.slice(0,9));
	}

}
