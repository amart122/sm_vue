export const $sm = {
    find_cookie(cookie_id) {
        const cookie = document.cookie.split(';').find( (x) => {
            return (x.split('=')[0].trim() == cookie_id.toString());
        });

        return cookie;
    }
};
