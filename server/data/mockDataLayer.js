import users from '../../mock/users.json';
import changemakers from '../../mock/changemakers.json';
import backings from '../../mock/backings.json';

export default class {

	static getAllUsers(){
		return Promise.resolve(users);
	}

	static getUserForEmail(email){
		return Promise.resolve(users.filter(user => user.email === email));
	}

	static getUserForId(id){
		return Promise.resolve(users.filter(user => user.id === id));
	}

	static getAllChangemakers(){
		const changemakerlist = [];
		changemakers.forEach((value) => {
			const usr = users.filter((obj) => {
				return obj.id === value.id;
			});
			changemakerlist.push(usr);
		});
		return Promise.resolve(changemakerlist);
	}

	static getFeaturedChangemakers(){
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

	static getAllPatrons() {
		return Promise.resolve([]);
	}

}
