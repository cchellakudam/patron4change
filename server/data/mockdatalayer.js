/**
 * Created by Lukas Stanek
 *         on 11/25/16.
 */
import fs from 'fs'


const users = JSON.parse(fs.readFileSync('mock/users.json', 'utf-8'));
const changemakers = JSON.parse(fs.readFileSync('mock/changemakers.json', 'utf-8'));

module.exports = {



	getAllUsers(){
		return users;
	},

	getUserForEmail(email){
		return users.filter(function (user) {
			return user.email === email;
		})
	},

	getUserForId(id){
		return users.filter(function (user) {
			return user.id === id;
		})
	},

	getAllChangemakers(){
		const changemakerlist = [];
		changemakers.forEach((value) => {
			const usr = users.filter((obj) => {
				return obj.id === value.id;
			});
			changemakerlist.push(usr);
		});
		return changemakerlist;
	}




}
