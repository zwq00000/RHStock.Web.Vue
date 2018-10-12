export const state = () => {
	return {
		accYear:2016,
		accYears:[]
	}
}

export const mutations = {
	//设置账套年度
	setAccYear(state,year){
		state.accYear = year
	},

	/**
	 * 可用账套年度
	 * @param {*} state 
	 * @param {int[]} years 
	 */
	setAccYears(state,years){
		state.accYears = years
	}
}

export const actions = {
	
}

export const getters = {
    /**
     * 当前账套年度
     * @param {*} state 
     */
	accYear(state){
		return state.accYear
	},

	/**
	 * 可用账套年度
	 * @param {*} state 
	 */
	accYears(state){
		return state.accYears
	}
}
