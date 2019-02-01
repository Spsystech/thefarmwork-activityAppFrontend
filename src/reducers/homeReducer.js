const initialState = {
    listData:[],
    downloadData:[],
    userprofileData:[] 
}
export default function (state = initialState, action={}) {
	switch (action.type) {		

    case `LIST_DATA_LOADING`:
       state.listData = [];
        return {
           ...state,
           isLoading: true,
           success: false,
           error: false
       };
    case `LIST_DATA_SUCCESS`:
       state.listData = action.payload.data;
        return {
            ...state,
            isLoading: false,
            success: true,
            error: false
        }; 
    case `LIST_DATA_ERROR`:
       state.listData = [];
        if(action.payload.response.status == 401){
            window.location = action.payload.response.data.data.logout_url
        }
        return {
            ...state,
            isLoading: false,
            success: false,
            error: true
        };

    case `DOWNLOAD_DATA_LOADING`:
       state.downloadData =[];
        return {
           ...state,
           isLoading: true,
           success: false,
           error: false
       };
    case `DOWNLOAD_DATA_SUCCESS`:
       state.downloadData = action.payload.data;
        return {
            ...state,
            isLoading: false,
            success: true,
            error: false
        }; 
    case `DOWNLOAD_DATA_ERROR`:
       state.downloadData = [];
        if(action.payload.response.status == 401){
            window.location = action.payload.response.data.data.logout_url
        }
        return {
            ...state,
            isLoading: false,
            success: false,
            error: true
        };  

    case `SET_RETENTION_LOADING`:
        return {
           ...state,
           isLoading: true,
           success: false,
           error: false
       };
    case `SET_RETENTION_SUCCESS`:
        return {
            ...state,
            isLoading: false,
            success: true,
            error: false
        }; 
    case `SET_RETENTION_ERROR`:
        if(action.payload.response.status == 401){
            window.location = action.payload.response.data.data.logout_url
        }
        return {
            ...state,
            isLoading: false,
            success: false,
            error: true
        };  

    case `USER_PROFILE_LOADING`:
       state.userprofileData = [];
        return {
           ...state,
           isLoading: true,
           success: false,
           error: false
       };
    case `USER_PROFILE_SUCCESS`:
       state.userprofileData = action.payload.data;
        return {
            ...state,
            isLoading: false,
            success: true,
            error: false
        }; 
    case `USER_PROFILE_ERROR`:
       state.userprofileData = [];
        if(action.payload.response.status == 401){
          window.location = action.payload.response.data.data.logout_url
        }
        return {
            ...state,
            isLoading: false,
            success: false,
            error: true
        };  

    default:
        return {
            ...state,
        };
	}
}