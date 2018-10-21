export const state = () => {
	return {
        //当前仓库代码
		whCode:''
	}
}

export const mutations = {
	
	setWhCode(state,whCode){
		state.whCode = whCode
	}
}

export const actions = {
	
}

export const getters = {
    whCode(state){
		return state.whCode
	}
}
