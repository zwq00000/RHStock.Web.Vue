export default function({ store, route, redirect }) {
	console.log(`MID:authenicated ${route.path}`)

	if (!store.getters.isAuthenticated) {
		if(route.path != '/user/login'){
			return redirect('/user/login')
		}
	}
}