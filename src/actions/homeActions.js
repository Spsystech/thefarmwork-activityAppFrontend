import api from './api';

export function getListData(queryData = ''){
	let url = queryData ? `?${queryData}` : '';
	return {
		type: 'LIST_DATA',
		payload: api.get(`/activity${url}`),
	};
}

export function getDownloadData(formDat){
	return {
		type: 'DOWNLOAD_DATA',
		payload: api.get(`/download?${formDat}`),
	};
}

export function postRetention(data){
	let bodyFormData = new FormData();
	bodyFormData.append('RetentionTime', data.RetentionTime); 
	bodyFormData.append('Id', data.Id); 
	return {
		type: 'SET_RETENTION',
		payload: api.post(`/retention`, bodyFormData),
	};
}

export function getUserProfile(){
	return {
		type: 'USER_PROFILE',
		payload: api.get(`/user_profile`),
	};
}