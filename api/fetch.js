
//get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
function get(url, config){
	return $nuxt.$axios.get(url,config)
}

//post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
function post(url, data, config){
	return $nuxt.$axios.post(url,data,config)
}

//delete(url: string, config?: AxiosRequestConfig): AxiosPromise;
function axiosDelete(url,config) {
	return $nuxt.$axios.delete(url,config)
}

//head(url: string, config?: AxiosRequestConfig): AxiosPromise;
function head(url,config){
	return $nuxt.$axios.head(url,config)
}

//put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
function put(url,data,config){
	return $nuxt.$axios.pub(url,data,config)
}

//patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
function patch(url,data,config){
	return $nuxt.$axios.patch(url,data,config)
}

function getBaseUrl(){
	return $nuxt.$axios.baseUrl
}

export default {
	get,
	post,
	baseUrl:getBaseUrl
}
