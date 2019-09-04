export default function ({ store, redirect }) {
    // If the user is not authenticated
    let token = localStorage.getItem('authentication');

    if (! token)
        return redirect('/login');
}