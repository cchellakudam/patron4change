import fs from 'fs'

const users = JSON.parse(fs.readFileSync('mock/users.json', 'utf-8'));
const changemakers = JSON.parse(fs.readFileSync('mock/changemakers.json', 'utf-8'));

module.exports = {

	getAllUsers(){
		return Promise.resolve(users);
	},

	getUserForEmail(email){
		return Promise.resolve(users.filter(user.email === email));
	},

	getUserForId(id){
		return Promise.resolve(users.filter(user.id === id));
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
