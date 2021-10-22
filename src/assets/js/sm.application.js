export const $sm = {
    find_cookie(cookie_id) {
        const cookie = document.cookie.split(';').find( (x) => {
            return (x.split('=')[0].trim() == cookie_id.toString());
        });

        return cookie;
    },
    /*** 
     * @params: array: An array to map, expected to be an array of Objects NOT primitives
     *          key: key to map by
     *          check_cond: An object with 2 properties
     *                      cond_check: this attribute is checked against each of the object's attrubte
     *                          if the attribute exists (is true), will return check_return
     *          check_return: Value to return if check_cond is true/existent
     * @return: Array, consisting of the values mapped by the key without any duplicates
     * */ 
    map_without_duplicates(array, key, check_cond = { cond_check: null, check_return: undefined }) {
        if(Object.prototype.toString.call(array) !== '[object Array]' || array.length == 0) {
            return []
        }
        return [...new Set(array.map( (x) => {
            if(check_cond['cond_check'] && check_cond['check_return'] !== undefined) {
                return (x[check_cond['cond_check']] ? check_cond['check_return'] : x[key])
            } else {
                return x[key]
            }
        }).filter( (x) => {
            return (x !== null && x !== undefined)
        }))]
    },
};
