import users from '../../mock/users.json';
import changemakers from '../../mock/changemakers.json';


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
	}

}
