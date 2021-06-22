export function globalAuthGuard(to, from, next) {
    const isAuth = !!localStorage.getItem('token');

    if (to.meta.authRequired && !isAuth) {
        next('login');
    }

    if (to.meta.guestRequired && isAuth) {
        next('/');
    }

    next();
}