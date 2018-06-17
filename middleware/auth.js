export default function ({store, redirect}) {
  if (!store.state.authUser) {
    return redirect('/login')
  } else if (store.state.authUser.isAdmin) {
    return redirect('/admin')
  } else {
    return redirect('/')
  }
}
