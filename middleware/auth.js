export default function ({store, redirect, route}) {
  if (!store.state.authUser) {
    return redirect('/login')
  } else if (store.state.authUser.isAdmin) {
    return redirect('/admin')
  }
}
